import { NgModule } from '@angular/core';
import { UserNotificationsComponent } from './user-notifications.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationSummaryModule } from '../../dashboard/notification-summary/notification-summary.module';
import { NotificationCreateModule } from '../../dashboard/notification-create/notification-create.module';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  declarations:[UserNotificationsComponent],
  imports : [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationSummaryModule,
    NotificationCreateModule,
    UiSwitchModule
  ],
  exports: [
    UserNotificationsComponent
  ]
})
export class UserNotificationsModule {}
