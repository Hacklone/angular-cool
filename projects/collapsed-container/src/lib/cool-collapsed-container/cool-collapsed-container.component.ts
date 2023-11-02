import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cool-collapsed-container',
  templateUrl: './cool-collapsed-container.component.html',
  styleUrls: ['./cool-collapsed-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('isExpanded', [
      state(
        'expanded',
        style({
          maxHeight: '{{ expandedMaxHeight }}px',
        }),
        {
          params: {
            expandedMaxHeight: 3000,
          },
        },
      ),
      state(
        'collapsed',
        style({
            maxHeight: '{{ collapsedMaxHeight }}',
          },
        ),
        {
          params: {
            collapsedMaxHeight: '300px',
          },
        },
      ),
      state(
        'initial',
        style({
            maxHeight: '{{ collapsedMaxHeight }}',
            overflow: 'auto',
          },
        ),
        {
          params: {
            collapsedMaxHeight: '300px',
          },
        },
      ),
      transition('collapsed <=> expanded', [
        animate('0.25s ease-in-out'),
      ]),
      transition('initial <=> *', [
        animate('0s'),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class CoolCollapsedContainer implements AfterViewInit, OnDestroy {
  private _resizeObserver?: ResizeObserver;

  private _isExpanded = false;

  constructor(
    private _changeDetector: ChangeDetectorRef,
  ) {
  }

  protected expandedMaxHeightPixelValue = 3000;

  public get isExpanded() {
    return this._isExpanded;
  }

  public get isCollapsed() {
    return !this._isExpanded;
  }

  @Input()
  public expandButtonText: string | undefined = undefined;

  @Input()
  public collapseButtonText: string | undefined = undefined;

  @Input()
  public collapsedMaxHeight: string = '300px';

  @Output()
  public expandedChanged = new EventEmitter<boolean>();

  public collapsingEnabled = false;

  @ViewChild('contentContainer')
  protected contentContainerElement?: ElementRef<HTMLElement>;

  public ngAfterViewInit(): void {
    if (this.contentContainerElement?.nativeElement) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._isContentHeightLargerThanMaxHeight()) {
          this.enableCollapsing();
        }
      });

      this._resizeObserver.observe(this.contentContainerElement.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    this._stopResizeObserver();
  }

  public enableCollapsing() {
    this.collapsingEnabled = true;

    if (this._isContentHeightLargerThanMaxHeight()) {
      this.collapseContainer();
    } else {
      this.expandContainer();
    }
  }

  public toggleExpanded() {
    if (!this.collapsingEnabled) {
      return;
    }

    if (this.isExpanded) {
      this.collapseContainer();
    } else {
      this.expandContainer();
    }
  }

  public expandContainer() {
    this._setIsExpanded(true);
  }

  private collapseContainer() {
    this._setIsExpanded(false);
  }

  private _setIsExpanded(isExpanded: boolean) {
    if (!this.collapsingEnabled) {
      return;
    }

    this._stopResizeObserver();

    this._isExpanded = isExpanded;

    this.expandedChanged.next(isExpanded);

    this._changeDetector.markForCheck();
  }

  private _stopResizeObserver() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  private _isContentHeightLargerThanMaxHeight(): boolean {
    const containerChild = <HTMLElement | undefined> this.contentContainerElement?.nativeElement.children.item(0);

    if (!containerChild) {
      return false;
    }

    const maxHeightNumber = Number(this.collapsedMaxHeight.match(/\d+/)?.[0]);

    if (isNaN(maxHeightNumber)) {
      return false;
    }

    const result = containerChild.offsetHeight > maxHeightNumber;

    if (result) {
      this.expandedMaxHeightPixelValue = containerChild.offsetHeight * 1.2;
    }

    return result;
  }
}
