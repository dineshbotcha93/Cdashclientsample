import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
//Auth Guard
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { AuthService } from '../../shared/services/auth.service';

export const routes: Routes = [
  { path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard] }
]
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  providers:[
    AuthGuard,
    AuthService,
  ],
  imports:[RouterModule.forRoot(routes),CommonModule]
})
export class DashboardModule {}
