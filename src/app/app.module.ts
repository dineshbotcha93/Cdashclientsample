import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { PaymentsModule } from './payments/payments.module';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { ContainersModule } from './shared/containers';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequesterService } from './shared/services/requester.service';
import { MockBackend } from '@angular/http/testing';
import { MockBackendService } from '../mocks/mock.backend.service';
import {environment} from '../environments/environment';
import { ComponentsModule }    from './shared/components';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BusinessModule } from './business/business.module';

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
import { UserManagementModule } from './user-management/UserManagement.module';
import { SharedModule } from './shared/modules/shared.module';

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
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    ReportsModule,
    PaymentsModule,
    LoginModule,
    HttpModule,
    ComponentsModule,
    HttpClientModule,
    ContainersModule,
    NgxDatatableModule,
    PipesModule,
    UserManagementModule,
    BusinessModule,
    NgbModule.forRoot(),
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
    RouterModule.forRoot(appRoutes),
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    RequesterService,
    MockBackendService,
    mockProvider,
    CommonSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
