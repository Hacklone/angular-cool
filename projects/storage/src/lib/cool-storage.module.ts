import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoolLocalStorage } from './cool-local-storage';
import { CoolSessionStorage } from './cool-session-storage';

@NgModule({
  providers: [
    CoolLocalStorage,
    CoolSessionStorage
  ]
})
export class CoolStorageModule {
  /** @deprecated */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoolStorageModule,
      providers: []
    };
  }
}
