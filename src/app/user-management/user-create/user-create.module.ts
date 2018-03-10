import { NgModule } from '@angular/core';
import { UserCreateComponent } from './user-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule,Validators  } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { FlowDisplayModule } from '../flow-display/flow-display.module';
import { FlowButtonsModule } from '../flow-buttons/flow-buttons.module';
import { CommonModule } from '@angular/common';

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
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    FlowDisplayModule,
    FlowButtonsModule,
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class UserCreateModule {}
