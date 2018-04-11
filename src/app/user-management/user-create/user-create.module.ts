import { NgModule } from '@angular/core';
import { UserCreateComponent } from './user-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule,Validators  } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { FlowDisplayModule } from '../flow-display/flow-display.module';
import { FlowButtonsModule } from '../flow-buttons/flow-buttons.module';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
    path:'',
    children:[{
      path: '', component:UserCreateComponent
    },{
      path:'fill-details', loadChildren: './fill-details/fill-details.module#FillDetailsModule'
    },
    {
      path: 'network-setup', loadChildren:'./networkSetup/networkSetup.module#NetworkSetupModule'
    }
  ]
}];

@NgModule({
  declarations: [UserCreateComponent],
  imports:[
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FlowDisplayModule,
    FlowButtonsModule,
    CommonModule,
    ComponentsModule
  ],
  exports: [
    RouterModule
  ]
})

export class UserCreateModule {
}
