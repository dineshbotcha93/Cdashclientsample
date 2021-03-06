import { NgModule } from '@angular/core';
import { NotificationListComponent } from './notificationList.component';
import {Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/modules/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const routes:Routes = [{
  path:'',component:NotificationListComponent
}]

@NgModule({
  declarations:[NotificationListComponent],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    AngularFontAwesomeModule,
    BsDatepickerModule.forRoot()
  ]
})
export class NotificationListModule {}
