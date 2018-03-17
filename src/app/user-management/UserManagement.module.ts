import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, EmailValidator } from '@angular/forms';
import { UserManagementService } from './user-management.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import {ComponentsModule}  from '../shared/components';
import { SharedModule } from '../shared/modules/shared.module';
import { FlowDisplayModule } from './flow-display/flow-display.module';
import { FlowButtonsModule } from './flow-buttons/flow-buttons.module';
import {NetworkSetupModule} from "./user-create/networkSetup/networkSetup.module";
import {NetworkSetupComponent} from "./user-create/networkSetup/networkSetup.component";

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
    UserUpdateComponent
  ],
  providers:[
    UserManagementService
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
    FlowDisplayModule
  ],
  exports:[
    RouterModule
  ]
})
export class UserManagementModule {}
