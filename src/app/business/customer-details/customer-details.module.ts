import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';
import { ComponentsModule }    from '../../shared/components';

export const routes: Routes = [{
  path: 'customer-details',
  component: CustomerDetailsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    NgxDatatableModule,
    FormsModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CustomerDetailsComponent],
  exports: [
    RouterModule
  ]
})
export class CustomerDetailsModule { }
