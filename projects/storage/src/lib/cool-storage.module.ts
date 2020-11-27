import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoolLocalStorage } from './cool-local-storage';
import { CoolSessionStorage } from './cool-session-storage';

@NgModule({})
export class CoolStorageModule {
  public static forRoot(): ModuleWithProviders<CoolStorageModule> {
    return {
      ngModule: CoolStorageModule,
      providers: [
        CoolLocalStorage,
        CoolSessionStorage,
      ]
    };
  }
}
