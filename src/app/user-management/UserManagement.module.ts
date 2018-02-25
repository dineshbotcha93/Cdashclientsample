import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { UserManagementService } from './user-management.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
{
  path:'',
  children:[
    { path: '', component: UserRegisterComponent },
    { path:'user-create/:id',component: UserCreateComponent },
    { path:'user-update/:id',component: UserUpdateComponent }
  ]
}
]
@NgModule({
  declarations:[
    UserRegisterComponent,
    UserUpdateComponent,
    UserCreateComponent,
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
  exports:[
    RouterModule
  ]
})
export class UserManagementModule {}
