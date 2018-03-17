import { NgModule } from '@angular/core';
import { NetworkSetupComponent } from './networkSetup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule,Validators  } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { FlowDisplayModule } from '../../flow-display/flow-display.module';
import { FlowButtonsModule } from '../../flow-buttons/flow-buttons.module';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../../../shared/components/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
  path:'',
  children:[{
    path: '', component:NetworkSetupComponent
  }]
}];

@NgModule({
  declarations: [NetworkSetupComponent],
  imports:[
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
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

export class NetworkSetupModule {
}
