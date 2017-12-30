import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { PaymentsModule } from './payments/payments.module';
import { SensorDetailsModule } from './sensor-details/sensor-details.module';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
/*import { EmptyComponent } from './empty.component';*/
import { LoginModule } from './auth/login/login.module';
import { ContainersModule } from './shared/containers';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequesterService } from './shared/services/requester.service';
import { MockBackend } from '@angular/http/testing';
import { MockBackendService } from '../mocks/mock.backend.service';
import {environment} from '../environments/environment';
import { ComponentsModule }    from './shared/components';
//Translation files
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageFactory } from '../i18n/language.factory';
import { store }               from './shared/store';
import { StoreModule }         from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Google map integration
import { AgmCoreModule } from '@agm/core';
// Datatable Integration
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const appRoutes: Routes = [{
  path:'',redirectTo:'login', pathMatch:'full'
}]

let mockProvider = [];
if(!environment.production)
{
  mockProvider.push({
    provide: Http,
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
      return new Http(backend, options);
    }
  });
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    ReportsModule,
    PaymentsModule,
    SensorDetailsModule,
    LoginModule,
    HttpModule,
    ComponentsModule,
    HttpClientModule,
    ContainersModule,
    NgxDatatableModule,
    StoreModule.forRoot({'tiles':store}),
    /**
    * Store devtools instrument the store retaining past versions of state
    * and recalculating new states. This enables powerful time-travel
    * debugging.
    *
    * To use the debugger, install the Redux Devtools extension for either
    * Chrome or Firefox
    *
    * See: https://github.com/zalmoxisus/redux-devtools-extension
    */
    StoreDevtoolsModule.instrument(),
    AgmCoreModule.forRoot({
   apiKey: 'AIzaSyBzgI77Zkjsakww8mMHBFXEo4io7SkW-0M'
 }),
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    RequesterService,
    MockBackendService,
    mockProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
