import { NgModule } from '@angular/core';
import { HACCPComponent } from './haccp.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

//remove this later,this is just temp solution to load haccp
import { DomSanitizer } from '@angular/platform-browser';
//Auth Guard
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ComponentsModule }    from '../shared/components';
import { ContainersModule }         from '../shared/containers';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared/modules/shared.module';
import {BusinessComponent} from "../business/business.component";
import {CustomerDetailsComponent} from "../business/customer-details/customer-details.component";
import {CustomerListComponent} from "../business/customer-list/customer-list.component";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DailySummaryReportComponent } from './reports/dailySummaryReport/dailySummaryReport.component';
import { CheckListReportComponent } from './reports/checkListReport/checkListReport.component';
import { TemperatureComponent } from "./reports/temperatureReport/temperature.component";
import {HaccpReportingService} from "./reports/services/haccpReporting.service";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {HaccpTempComponent} from "./haccp-temp.component";
import {SafePipe} from "../shared/pipes/safe.pipe";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HACCPComponent
  },
];
@NgModule({
  declarations: [
    HACCPComponent,
    DailySummaryReportComponent,
    CheckListReportComponent,
    TemperatureComponent,
    HaccpTempComponent
  ],
  providers:[
    AuthGuard,
    AuthService,
    HaccpReportingService,
    SafePipe
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule,
    ContainersModule,
    SharedModule,
    PdfViewerModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports:[
    RouterModule
  ]
})
export class HACCPModule {}
