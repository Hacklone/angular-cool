import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AsyncIterator } from './async-iterator.interface';
import { ViewPort } from './view-port';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

const VIEW_PORT_SIZE_MULTIPLIER = 1.5;
const VIEW_PORT_MOVE_BOUNDARY_MULTIPLIER = 0.4;
const SCROLL_CONTAINER_ATTRIBUTE_NAME = 'cool-virtual-grid-container';
const MILLISECONDS_TO_WAIT_ON_SCROLLING_BEFORE_RENDERING = 10;
const MILLISECONDS_TO_WAIT_ON_WINDOW_RESIZE_BEFORE_RENDERING = 200;

@Component({
  selector: 'cool-virtual-grid',
  template: '<div class="cool-virtual-grid"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host-context([cool-virtual-grid-container]) {
      overflow-y: auto;
      overflow-x: hidden;
    }

    :host {
      display: block;
      position: relative;

      text-align: center;
    }
  `]
})
export class CoolVirtualGridComponent implements OnInit, OnDestroy {
  private _scrollContainer: HTMLElement;

  private _currentElementHeight = 0;

  private _itemsPerRow: number;
  private _rowsPerViewPort: number;
  private _itemsPerViewPort: number;
  private _viewPortHeight: number;

  private _topViewPort: ViewPort;
  private _middleViewPort: ViewPort;
  private _bottomViewPort: ViewPort;

  private _moveTopBoundary: number;
  private _moveBottomBoundary: number;

  private _componentDestroyedSubject: Subject<void> = new Subject<void>();

  private plannedViewPortScrollTop: number;

  constructor(private element: ElementRef,
              private viewContainer: ViewContainerRef) {
  }

  @Input()
  public itemIterator: AsyncIterator<any>;

  @Input()
  public itemWidth: number;

  @Input()
  public itemHeight: number;

  @Input()
  public itemSpace: number;

  @Input()
  public bodyScroll: boolean;

  @ContentChild(TemplateRef)
  public template: TemplateRef<object>;

  public async ngOnInit(): Promise<any> {
    const self = this;

    checkInjectedParameters();

    this._scrollContainer = getScrollContainer();

    this.calculateParameters();

    this._moveTopBoundary = 0;
    this._moveBottomBoundary = this._viewPortHeight * (1 - VIEW_PORT_MOVE_BOUNDARY_MULTIPLIER);

    await this.initialRenderAsync();

    const isBodyScroll = this._scrollContainer.tagName === 'HTML';
    const scrollEventSource = isBodyScroll ? window : this._scrollContainer;

    fromEvent(scrollEventSource, 'scroll')
      .pipe(
        debounceTime(MILLISECONDS_TO_WAIT_ON_SCROLLING_BEFORE_RENDERING),
        takeUntil(this._componentDestroyedSubject),
      )
      .subscribe(async () => {
        await this.handleCurrentScroll(isBodyScroll ? window.document.body.scrollTop : this._scrollContainer.scrollTop);
      });

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(MILLISECONDS_TO_WAIT_ON_WINDOW_RESIZE_BEFORE_RENDERING),
        takeUntil(this._componentDestroyedSubject),
      )
      .subscribe(async () => {
        await this.onWindowResizeAsync();
      });

    function checkInjectedParameters() {
      if (!self.itemIterator) {
        throw new Error('Binding the [itemIterator] input is mandatory!');
      }

      if (self.itemWidth === undefined) {
        throw new Error('Binding the [itemWidth] input is mandatory!');
      }

      if (self.itemHeight === undefined) {
        throw new Error('Binding the [itemHeight] input is mandatory!');
      }

      if (self.itemSpace === undefined) {
        throw new Error('Binding the [itemSpace] input is mandatory!');
      }
    }

    function getScrollContainer() {
      if (self.bodyScroll) {
        const htmlElement = window.document.getElementsByTagName('html')[0];

        htmlElement.setAttribute(SCROLL_CONTAINER_ATTRIBUTE_NAME, 'true');

        return htmlElement;
      }

      let currentNode = self.element.nativeElement.parentNode;

      while (currentNode) {
        if (currentNode.attributes && currentNode.attributes[SCROLL_CONTAINER_ATTRIBUTE_NAME]) {
          break;
        }

        currentNode = currentNode.parentNode;
      }

      if (currentNode) {
        return currentNode;
      }

      const parent = self.element.nativeElement.parentNode;

      parent.setAttribute(SCROLL_CONTAINER_ATTRIBUTE_NAME, 'true');

      return parent;
    }
  }

  public ngOnDestroy() {
    this._componentDestroyedSubject.next();

    this._componentDestroyedSubject.complete();
  }

  public async reRenderAsync(): Promise<void> {
    await this.reRenderFromScrollAsync(this._scrollContainer.scrollTop);
  }

  public async resetAsync(): Promise<void> {
    if (this.bodyScroll) {
      window.document.body.scrollTo(0, 0);
    } else {
      this._scrollContainer.scrollTo(0, 0);
    }

    await this.reRenderAsync();
  }

  private get visibleItemHeight() {
    return (this.itemHeight || 0) + (2 * (this.itemSpace || 0));
  }

  private get visibleItemWidth() {
    return (this.itemWidth || 0) + (2 * (this.itemSpace || 0));
  }

  private async onWindowResizeAsync() {
    this.calculateParameters();

    this._setHeightForElement(0);

    await this.reRenderFromScrollAsync(this._scrollContainer.scrollTop);
  }

  private async getItemsAsync(fromIndex: number, numberOfItems: number): Promise<any[]> {
    try {
      if (fromIndex < 0) {
        fromIndex = 0;
      }

      const result = await this.itemIterator.next(fromIndex, numberOfItems);

      if (!result) {
        return [];
      }

      if (result.value instanceof Array) {
        return result.value;
      }

      return [];
    } catch (e) {
      console.log(e);
    }

    return [];
  }

  private calculateParameters() {
    const self = this;

    const availableWidth = calculateAvailableWidth();
    const availableHeight = calculateAvailableHeight();

    this._viewPortHeight = calculateViewPortHeight();
    this._rowsPerViewPort = calculateRowsPerViewPort();
    this._itemsPerRow = calculateItemsPerRow();
    this._itemsPerViewPort = this._rowsPerViewPort * this._itemsPerRow;

    function calculateAvailableWidth() {
      return self._scrollContainer.offsetWidth;
    }

    function calculateAvailableHeight() {
      return self._scrollContainer.offsetHeight;
    }

    function calculateViewPortHeight() {
      const bareHeight = availableHeight * VIEW_PORT_SIZE_MULTIPLIER;

      const rowsFitInHeight = Math.floor(bareHeight / self.visibleItemHeight) || 0;

      return rowsFitInHeight * self.visibleItemHeight;
    }

    function calculateRowsPerViewPort() {
      return self._viewPortHeight / self.visibleItemHeight;
    }

    function calculateItemsPerRow() {
      return Math.floor(availableWidth / self.visibleItemWidth) || 0;
    }
  }

  private async handleCurrentScroll(scrollTop: number): Promise<any> {
    if (scrollTop < 0) {
      scrollTop = 0;
    }

    if (scrollTop > this._bottomViewPort.bottomScrollTop && this.isLastViewPortRendered) {
      return;
    }

    if (scrollTop < this._topViewPort.scrollTop || scrollTop > this._bottomViewPort.bottomScrollTop) {
      await this.reRenderFromScrollAsync(scrollTop);
    } else if (scrollTop < this._moveTopBoundary) {
      await this.moveUpAsync();
    } else if (scrollTop > this._moveBottomBoundary) {
      await this.moveDownAsync();
    } else {
      return;
    }

    this.calculateMoveBoundaries();
  }

  private calculateMoveBoundaries() {
    this._moveTopBoundary = this._topViewPort.scrollTop + (this._viewPortHeight * (1 - VIEW_PORT_MOVE_BOUNDARY_MULTIPLIER));

    if (this._moveTopBoundary < 0) {
      this._moveTopBoundary = 0;
    }

    if (this.isLastViewPortRendered) {
      this._moveBottomBoundary = Infinity;
    } else {
      this._moveBottomBoundary = this._middleViewPort.scrollTop + (this._viewPortHeight * (1 - VIEW_PORT_MOVE_BOUNDARY_MULTIPLIER));
    }
  }

  private get isLastViewPortRendered() {
    return this._topViewPort.isLastViewPort || this._middleViewPort.isLastViewPort || this._bottomViewPort.isLastViewPort;
  }

  private async moveUpAsync(): Promise<void> {
    const viewPortScrollTop = this._topViewPort.scrollTop - this._viewPortHeight;
    const fromIndex = this._topViewPort.itemsFromIndex - this._itemsPerViewPort;

    this.plannedViewPortScrollTop = viewPortScrollTop;

    const viewPortItems = await this.getItemsAsync(fromIndex, this._itemsPerViewPort);

    if (this.plannedViewPortScrollTop !== viewPortScrollTop) {
      return;
    }

    if (!viewPortItems || !viewPortItems.length) {
      return;
    }

    const newViewPort = new ViewPort();
    newViewPort.scrollTop = viewPortScrollTop;
    newViewPort.items = viewPortItems;
    newViewPort.itemsFromIndex = fromIndex;
    newViewPort.isLastViewPort = false;
    newViewPort.height = this.calculateViewPortHeight(newViewPort.numberOfItems);

    this.renderViewPort(newViewPort);

    const oldBottomViewPort = this._bottomViewPort;

    this._bottomViewPort = this._middleViewPort;
    this._middleViewPort = this._topViewPort;
    this._topViewPort = newViewPort;

    this.destroyViewPort(oldBottomViewPort);
  }

  private async moveDownAsync(): Promise<void> {
    const viewPortScrollTop = this._bottomViewPort.bottomScrollTop;
    const fromIndex = this._bottomViewPort.itemsFromIndex + this._itemsPerViewPort;

    this.plannedViewPortScrollTop = viewPortScrollTop;

    const viewPortItems = await this.getItemsAsync(fromIndex, this._itemsPerViewPort);

    if (this.plannedViewPortScrollTop !== viewPortScrollTop) {
      return;
    }

    if (!viewPortItems || !viewPortItems.length) {
      this._bottomViewPort.isLastViewPort = true;

      return;
    }

    const newViewPort = new ViewPort();
    newViewPort.scrollTop = viewPortScrollTop;
    newViewPort.items = viewPortItems;
    newViewPort.itemsFromIndex = fromIndex;
    newViewPort.isLastViewPort = viewPortItems.length < this._itemsPerViewPort;
    newViewPort.height = this.calculateViewPortHeight(newViewPort.numberOfItems);

    this.renderViewPort(newViewPort);

    const oldTopViewPort = this._topViewPort;

    this._topViewPort = this._middleViewPort;
    this._middleViewPort = this._bottomViewPort;
    this._bottomViewPort = newViewPort;

    this.destroyViewPort(oldTopViewPort);
  }

  private renderViewPort(viewPort: ViewPort) {
    const viewPortElement = document.createElement('div');

    viewPortElement.classList.add('cool-virtual-grid-view-port');
    viewPortElement.style.top = `${viewPort.scrollTop}px`;
    viewPortElement.style.height = `${viewPort.height}px`;
    viewPortElement.style.width = `100%`;
    viewPortElement.style.position = 'absolute';

    viewPort.nativeElement = viewPortElement;

    // grow element if needed
    const minimumElementHeight = viewPort.bottomScrollTop;
    if (minimumElementHeight > this._currentElementHeight) {
      this._setHeightForElement(minimumElementHeight);
    }

    for (const item of viewPort.items) {
      const embeddedView = this.template.createEmbeddedView({
        $implicit: item
      });

      viewPort.renderedItems.push(embeddedView);

      this.viewContainer.insert(embeddedView);

      const itemNode = document.createElement('div');
      itemNode.classList.add('cool-virtual-grid-item');
      itemNode.style.display = 'inline-block';
      itemNode.style.verticalAlign = 'top';
      itemNode.style.height = `${this.itemHeight}px`;
      itemNode.style.width = `${this.itemWidth}px`;
      itemNode.style.margin = `${this.itemSpace}px`;

      for (const viewNode of embeddedView.rootNodes) {
        itemNode.appendChild(viewNode);
      }

      viewPort.nativeElement.appendChild(itemNode);
    }

    this.element.nativeElement.appendChild(viewPort.nativeElement);
  }

  private _setHeightForElement(minimumElementHeight: number) {
    this._currentElementHeight = minimumElementHeight;

    this.element.nativeElement.style.height = `${this._currentElementHeight}px`;
  }

  private destroyViewPort(viewPort: ViewPort) {
    for (const item of viewPort.renderedItems) {
      item.destroy();
    }

    if (viewPort.nativeElement) {
      this.element.nativeElement.removeChild(viewPort.nativeElement);
    }
  }

  private async initialRenderAsync(): Promise<any> {
    await this.reRenderFromScrollAsync(0);

    this.calculateMoveBoundaries();
  }

  private async reRenderFromScrollAsync(scrollTop: number): Promise<void> {
    const currentViewPortIndex = Math.floor(scrollTop / this._viewPortHeight) || 0;
    const topScrollTop = currentViewPortIndex * this._viewPortHeight;

    const fromIndex = currentViewPortIndex * this._itemsPerViewPort;

    const viewPortItems = await this.getItemsAsync(fromIndex, 3 * this._itemsPerViewPort);

    // Top ViewPort
    if (this._topViewPort) {
      this.destroyViewPort(this._topViewPort);
    }

    this._topViewPort = new ViewPort();

    this._topViewPort.scrollTop = topScrollTop;
    this._topViewPort.itemsFromIndex = fromIndex;
    this._topViewPort.items = viewPortItems.slice(0, this._itemsPerViewPort);
    this._topViewPort.isLastViewPort = this._topViewPort.numberOfItems < this._itemsPerViewPort;
    this._topViewPort.height = this.calculateViewPortHeight(this._topViewPort.numberOfItems);

    this.renderViewPort(this._topViewPort);

    // Middle ViewPort
    if (this._middleViewPort) {
      this.destroyViewPort(this._middleViewPort);
    }

    this._middleViewPort = new ViewPort();

    this._middleViewPort.scrollTop = topScrollTop + this._viewPortHeight;
    this._middleViewPort.itemsFromIndex = fromIndex + this._itemsPerViewPort;
    this._middleViewPort.items = viewPortItems.slice(this._itemsPerViewPort, 2 * this._itemsPerViewPort);
    this._middleViewPort.isLastViewPort = this._middleViewPort.numberOfItems < this._itemsPerViewPort;
    this._middleViewPort.height = this.calculateViewPortHeight(this._middleViewPort.numberOfItems);

    if (!this._topViewPort.isLastViewPort) {
      this.renderViewPort(this._middleViewPort);
    }

    // Bottom ViewPort
    if (this._bottomViewPort) {
      this.destroyViewPort(this._bottomViewPort);
    }

    this._bottomViewPort = new ViewPort();

    this._bottomViewPort.scrollTop = topScrollTop + (2 * this._viewPortHeight);
    this._bottomViewPort.itemsFromIndex = fromIndex + (2 * this._itemsPerViewPort);
    this._bottomViewPort.items = viewPortItems.slice(2 * this._itemsPerViewPort, 3 * this._itemsPerViewPort);
    this._bottomViewPort.isLastViewPort = this._bottomViewPort.numberOfItems < this._itemsPerViewPort;
    this._bottomViewPort.height = this.calculateViewPortHeight(this._bottomViewPort.numberOfItems);

    if (!this._middleViewPort.isLastViewPort) {
      this.renderViewPort(this._bottomViewPort);
    }
  }

  private calculateViewPortHeight(numberOfItems: number): number {
    if (numberOfItems === this._itemsPerViewPort) {
      return this._viewPortHeight;
    }

    const rowCount = Math.ceil(numberOfItems / this._itemsPerRow) || 0;

    return rowCount * this.visibleItemHeight;
  }
}
