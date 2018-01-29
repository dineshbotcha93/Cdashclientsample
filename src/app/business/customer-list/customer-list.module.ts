import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ContainersModule } from '../../shared/containers';
import { ComponentsModule } from '../../shared/components';

import { BusinessComponent } from '../business.component';

export const routes: Routes = [
  {
    path: 'customer-list',
    component: CustomerListComponent
  }
];


@NgModule({
  declarations: [BusinessComponent, CustomerListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    RouterModule
  ]
})

export class CustomerListModule { }