import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path:'dashboard',component: DashboardComponent }
]
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports:[RouterModule.forRoot(routes),CommonModule]
})
export class DashboardModule {}
