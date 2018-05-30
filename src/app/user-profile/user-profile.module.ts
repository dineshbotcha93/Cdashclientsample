import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ContainersModule} from '../shared/containers';
import {ComponentsModule} from '../shared/components';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserNotificationsModule } from './user-notifications/user-notifications.module';
import { NotificationSummaryModule } from '../dashboard/notification-summary/notification-summary.module';
import { ModalModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { TooltipModule } from 'ngx-bootstrap';
import { NotificationCreateModule } from '../dashboard/notification-create/notification-create.module';

const routes: Routes = [
{
  path: '',
  //canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: UserProfileComponent
    }
  ]
}
]
@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    NotificationCreateModule,
    NotificationSummaryModule,
    UserNotificationsModule,
    ButtonsModule.forRoot(),
    TimepickerModule.forRoot(),
    MultiselectDropdownModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
]
})
export class UserProfileModule {}
