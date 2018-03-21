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
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { NotificationSummaryComponent } from '../dashboard/notification-summary/notification-summary.component';
import { NotificationCreateComponent } from '../dashboard/notification-create/notification-create.component';
import { ModalModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

const routes: Routes = [
{
  path: 'user-profile',
 // canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: UserProfileComponent
    }
  ]
}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    ButtonsModule.forRoot(),TimepickerModule.forRoot(),MultiselectDropdownModule,BsDatepickerModule.forRoot()
  ],
  declarations: [UserProfileComponent, UserNotificationsComponent,NotificationSummaryComponent,NotificationCreateComponent],
  providers: [
    AuthGuard,
    AuthService,
]
})
export class UserProfileModule { }
