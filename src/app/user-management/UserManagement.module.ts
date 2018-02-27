import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, EmailValidator } from '@angular/forms';
import { UserManagementService } from './user-management.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { SharedModule } from '../shared/modules/shared.module';

const routes: Routes = [
{
  path:'',
  children:[
    { path: '', component: UserRegisterComponent },
    {
      path: 'user-create/:id',loadChildren:'./user-create/user-create.module#UserCreateModule',
    },
    { path:'user-update/:id',component: UserUpdateComponent }
  ]
}
]
@NgModule({
  declarations:[
    UserRegisterComponent,
    UserUpdateComponent,
  ],
  providers:[
    UserManagementService
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    RouterModule
  ]
})
export class UserManagementModule {}
