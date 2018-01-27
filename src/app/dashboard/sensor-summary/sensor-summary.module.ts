import { NgModule } from '@angular/core';
import {SensorSummaryComponent } from './sensor-summary.component';
import {Route, RouterModule } from '@angular/router';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes';
import { FormsModule } from '@angular/forms';
import { FilterByCriteria } from './pipes/filterByCriteria.pipe';

import { Ng2SliderComponent } from 'ng2-slider-component/ng2-slider.component';
import { SlideAbleDirective } from 'ng2-slideable-directive/slideable.directive';
import { Ng2StyledDirective } from 'ng2-styled-directive/ng2-styled.directive';


import { CreateDeviceComponent } from '../create-device/create-device.component';


const routes:Object[] = [{
  path:'dashboard/sensor-summary/:id',component:SensorSummaryComponent
}];

@NgModule({
 declarations:[SensorSummaryComponent,FilterByCriteria, 
    SlideAbleDirective,
    Ng2StyledDirective,
    Ng2SliderComponent,CreateDeviceComponent],
  imports:[
    RouterModule.forChild(routes),
    ContainersModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule,

  ],
  exports: [
    Ng2SliderComponent,
    Ng2StyledDirective,CreateDeviceComponent

  ]
})
export class SensorSummaryModule {}
