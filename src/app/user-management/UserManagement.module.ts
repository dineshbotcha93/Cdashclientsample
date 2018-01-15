import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms'; 
import { EmailValidator } from '@angular/forms';
import { UserManagementService } from './user-management.service';
import { UserRegisterComponent } from './user-register/user-register.component';


export const routes: Routes = [
  { path:'user-register',component: UserRegisterComponent }
]

@NgModule({
  declarations: [
    UserRegisterComponent,
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
