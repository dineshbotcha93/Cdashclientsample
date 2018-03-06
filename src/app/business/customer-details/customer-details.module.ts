import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';

import { TabsModule } from 'ngx-bootstrap';

export const routes: Routes = [{
  path: 'customer-details',
  component: CustomerDetailsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot()
  ],
  declarations: [CustomerDetailsComponent],
  exports: [
    RouterModule
  ]
})
export class CustomerDetailsModule { }
