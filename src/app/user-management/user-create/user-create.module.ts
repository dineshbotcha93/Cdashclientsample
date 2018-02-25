import { NgModule } from '@angular/core';
import { UserCreateComponent } from './user-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [{
    path:'',
    children:[{
      path: '', component:UserCreateComponent
    },{
      path:'fill-details', loadChildren: './fill-details/fill-details.module#FillDetailsModule'
    }]
}];

@NgModule({
  declarations: [UserCreateComponent],
  imports:[
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})

export class UserCreateModule {}
