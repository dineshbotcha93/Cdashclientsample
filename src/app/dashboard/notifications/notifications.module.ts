import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotificationCreateModule } from '../notification-create/notification-create.module';
import { NotificationOverviewModule } from '../notification-overview/notification-overview.module';
import { NotificationSummaryModule } from '../notification-summary/notification-summary.module';

@NgModule({
  declarations:[NotificationsComponent],
  imports:[
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    NotificationCreateModule,
    NotificationOverviewModule,
    NotificationSummaryModule,
    BsDatepickerModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    NotificationCreateModule
  ]
})

export class NotificationsModule {}
