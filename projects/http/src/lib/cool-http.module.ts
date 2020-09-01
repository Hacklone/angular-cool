import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoolHttp } from './cool-http.service';

@NgModule({
  exports: [],
  imports: [HttpClientModule],
  providers: [CoolHttp]
})
export class CoolHttpModule {
  /** @deprecated */
  public static forRoot(): ModuleWithProviders<CoolHttpModule> {
    return {
      ngModule: CoolHttpModule,
      providers: []
    };
  }
}
