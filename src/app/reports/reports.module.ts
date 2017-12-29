import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import {Routes,RouterModule} from '@angular/router';

export const routes: Routes = [
  { path:'reports',component: ReportsComponent }
]
@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports:[RouterModule.forRoot(routes),]
})
export class ReportsModule {}
