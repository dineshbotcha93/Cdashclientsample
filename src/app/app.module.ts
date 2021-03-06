import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ReportsModule } from './reports/reports.module';
import { PaymentsModule } from './payments/payments.module';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ContainersModule } from './shared/containers';
import { Http, HttpModule, BaseRequestOptions, XHRBackend } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { RequesterService } from './shared/services/requester.service';
import { MockBackend } from '@angular/http/testing';
import { MockBackendService } from '../mocks/mock.backend.service';
import { ProductionInterceptor } from '../production/productionInterceptor';
import {environment} from '../environments/environment';
import { ComponentsModule }    from './shared/components';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BusinessModule } from './business/business.module';
import { ForgotPasswordModule} from './user-management/forgot-password/forgot-password.module';
//Translation files
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageFactory } from '../i18n/language.factory';
import { store }               from './shared/store';
import { StoreModule }         from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Datatable Integration
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule }                  from './shared/pipes';
import { CommonSharedService } from './shared/services/common-shared.service';
import { SharedModule } from './shared/modules/shared.module';
import {ToastModule,ToastsManager} from 'ng2-toastr/ng2-toastr';
import { AlertSandbox } from './shared/components/alerts/alerts.sandbox';


const appRoutes: Routes = [{
  path:'',redirectTo:'login', pathMatch:'full',
},
{
  path:'user-register',loadChildren:'./user-management/UserManagement.module#UserManagementModule'
},
{
  path:'login', loadChildren: './auth/login/login.module#LoginModule'
},
{
  path:'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
},
{
  path:'user-profile',pathMatch:'full',loadChildren: './user-profile/user-profile.module#UserProfileModule'
},
{
  path:'forgot-password', pathMatch:'full',loadChildren: './user-management/forgot-password/forgot-password.module#ForgotPasswordModule'
},
{
  path: 'haccp', loadChildren: './haccp/haccp.module#HACCPModule'
}
]

let mockProvider = [];
if(!environment.production)
{
  mockProvider.push({
    provide: Http,
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, options: BaseRequestOptions, realBackend: Http) => {
      return new Http(backend, options);
    }
  });
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReportsModule,
    PaymentsModule,
    HttpModule,
    ComponentsModule,
    HttpClientModule,
    ContainersModule,
    NgxDatatableModule,
    PipesModule,
    BusinessModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({'tiles':store}),
    ToastModule.forRoot(),
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
    RouterModule.forRoot(appRoutes,{enableTracing:false,useHash:true}),
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    RequesterService,
    MockBackendService,
    mockProvider,
    ProductionInterceptor,
    CommonSharedService,
    ToastsManager,
    AlertSandbox,
    {
      provide: Http,
      deps: [XHRBackend,BaseRequestOptions],
      useFactory: (backend: XHRBackend, options: BaseRequestOptions) => {
          return new ProductionInterceptor(backend,options);
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
