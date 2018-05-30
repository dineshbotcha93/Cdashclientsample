import { NgModule } from '@angular/core';
import { NotificationCreateComponent } from './notification-create.component';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ButtonsModule } from 'ngx-bootstrap';

@NgModule({
  declarations:[NotificationCreateComponent],
  imports:[
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    AngularFontAwesomeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    MultiselectDropdownModule,ButtonsModule.forRoot()
  ],
  exports:[
    NotificationCreateComponent
  ]
})

export class NotificationCreateModule {}
