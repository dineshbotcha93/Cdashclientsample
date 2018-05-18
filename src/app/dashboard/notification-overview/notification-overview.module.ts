import { NgModule } from '@angular/core';
import { NotificationOverviewComponent } from './notification-overview.component';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotificationSummaryModule } from '../notification-summary/notification-summary.module';
import { NotificationCreateModule } from '../notification-create/notification-create.module';

@NgModule({
  declarations:[NotificationOverviewComponent],
  imports:[
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    AngularFontAwesomeModule,
    NotificationSummaryModule,
    NotificationCreateModule,
    BsDatepickerModule.forRoot()
  ],
  exports:[
    NotificationOverviewComponent
  ]
})

export class NotificationOverviewModule {}
