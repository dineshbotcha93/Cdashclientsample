import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
//Auth Guard
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ComponentsModule }    from '../shared/components';
import { ContainersModule }         from '../shared/containers';
import { SharedModule } from '../shared/modules/shared.module';
import {NotificationListComponentModule} from "./notificationList/notificationList.module";

const routes: Routes = [
  {
    path: '',
    data:{
      breadcrumb:'dashboard'
    },
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'sensor-summary/:id',
        pathMatch:'full',
        loadChildren:'./sensor-summary/sensor-summary.module#SensorSummaryModule',
        canActivate: [AuthGuard],
        data:{
          breadcrumb:'sensor-summary'
        }
      },
      {
        path:'sensor-details/:id',
        pathMatch:'full',
        loadChildren: './sensor-details/sensor-details.module#SensorDetailsModule',
        data:{
          breadcrumb:'sensor-details'
        }
      },
      {
        path:'sensor-comparison/:id',
        pathMatch:'full',
        loadChildren: './sensor-comparison/sensor-comparison.module#SensorComparisonModule',
        data:{
          breadcrumb:'sensor-comparison'
        }
      },
      {
        path:'notificationList',
        pathMatch:'full',
        loadChildren: './notificationList/notificationList.module#NotificationListComponentModule',
        data:{
          breadcrumb:'notificationList'
        }
      }
    ]
  },
]
@NgModule({
  declarations: [
    DashboardComponent
  ],
  providers:[
   AuthGuard,
   AuthService
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule,
    ContainersModule,
    SharedModule
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardModule {}
