import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from './fill-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlowDisplayModule } from '../../flow-display/flow-display.module';
import { FlowButtonsModule } from '../../flow-buttons/flow-buttons.module';
import {ComponentsModule} from '../../../shared/components';
import { ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [{
    path:'',component: FillDetailsComponent
}];

@NgModule({
  declarations: [FillDetailsComponent],
  imports:[
    RouterModule.forChild(routes),
    FlowDisplayModule,
    FlowButtonsModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})

export class FillDetailsModule {}
