import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { PaymentsModule } from './payments/payments.module';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty.component';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { RequesterService } from '../shared/services/requester.service';
import { MockBackend } from '@angular/http/testing';
import { MockBackendService } from '../mocks/mock.backend.service';
import {environment} from '../environments/environment';
const appRoutes: Routes = [{
  path:'',component:EmptyComponent
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
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    ReportsModule,
    PaymentsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
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
