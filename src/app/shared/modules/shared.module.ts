import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageFactory } from '../../../i18n/language.factory';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TranslateService]
    };
  }
}
