import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContainersModule } from '../../shared/containers';
import { ComponentsModule } from '../../shared/components';
import { FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export const routes: Routes = [
  {
    path: 'customer-list',
    component: CustomerListComponent
  }
];


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule,
    ContainersModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    RouterModule
  ]
})

export class CustomerListModule { 

}