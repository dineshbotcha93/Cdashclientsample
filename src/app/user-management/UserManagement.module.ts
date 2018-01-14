import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms'; 
import { EmailValidator } from '@angular/forms';
import { UserManagementService } from '../shared/services/user-management.service';


export const routes: Routes = [
  { path:'user-management',component: UserManagementComponent }
]

@NgModule({
  declarations: [
    UserManagementComponent,
  ],
    providers:[
    UserManagementService
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class UserManagementModule {}
