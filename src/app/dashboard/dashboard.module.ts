import { NgModule, Component, } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
//Auth Guard
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ComponentsModule }    from '../shared/components';
import { ContainersModule }         from '../shared/containers';
import { SensorDetailsModule }    from './sensor-details/sensor-details.module';
import { SensorSummaryModule }    from './sensor-summary/sensor-summary.module';
import { SensorComparisonModule } from './sensor-comparison/sensor-comparison.module';
import { SharedModule } from '../shared/modules/shared.module';
export const routes: Routes = [
  { path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard] },
]
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  providers:[
    AuthGuard,
    AuthService
  ],
  imports:[
    RouterModule.forRoot(routes),
    CommonModule,
    ComponentsModule,
    ContainersModule,
    SensorDetailsModule,
    SensorSummaryModule,
    SensorComparisonModule,
    SharedModule
  ]

})
export class DashboardModule {}
