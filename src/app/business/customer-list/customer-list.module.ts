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
    BsDatepickerModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})

export class CustomerListModule { 
  // minDate = new Date(2017, 5, 10);
  // maxDate = new Date(2018, 9, 15);
 
  // bsValue: Date = new Date();
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}