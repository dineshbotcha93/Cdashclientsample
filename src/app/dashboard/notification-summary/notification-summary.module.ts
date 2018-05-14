import { NgModule } from '@angular/core';
import { NotificationSummaryComponent } from './notification-summary.component';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  declarations:[NotificationSummaryComponent],
  imports:[
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    AngularFontAwesomeModule,
    BsDatepickerModule.forRoot(),UiSwitchModule
  ],
  exports:[
    NotificationSummaryComponent
  ]
})

export class NotificationSummaryModule {}
