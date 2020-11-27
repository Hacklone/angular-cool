import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoolHttp } from './cool-http.service';

@NgModule({
  imports: [HttpClientModule],
})
export class CoolHttpModule {
  public static forRoot(): ModuleWithProviders<CoolHttpModule> {
    return {
      ngModule: CoolHttpModule,
      providers: [
        CoolHttp,
      ],
    };
  }
}
