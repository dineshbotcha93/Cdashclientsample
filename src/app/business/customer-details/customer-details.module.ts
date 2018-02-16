import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';

export const routes: Routes = [{
  path: 'customer-details',
  component: CustomerDetailsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerDetailsComponent],
  exports: [
    RouterModule
  ]
})
export class CustomerDetailsModule { }
