import { NgModule, Component, } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule }           from 'ng2-translate';
//Auth Guard
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ComponentsModule }    from '../shared/components';
import { ContainersModule }         from '../shared/containers';
import { SensorDetailsModule }    from './sensor-details/sensor-details.module';
import { SensorSummaryModule }    from './sensor-summary/sensor-summary.module';

export const routes: Routes = [
  { path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard] },
]
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  providers:[
    AuthGuard,
    AuthService,
  ],
  imports:[
    RouterModule.forRoot(routes),
    CommonModule,
    ComponentsModule,
    ContainersModule,
    SensorDetailsModule,
    SensorSummaryModule,
    TranslateModule.forRoot(),
  ]
})
export class DashboardModule {}
