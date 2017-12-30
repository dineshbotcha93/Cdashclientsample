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
    TranslateModule.forRoot(),
  ]
})
export class DashboardModule {}
