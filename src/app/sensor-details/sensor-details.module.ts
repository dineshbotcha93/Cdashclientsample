import { NgModule } from '@angular/core';
import {SensorDetailsComponent } from './sensor-details.component';
import {Route, RouterModule } from '@angular/router';
import { ContainersModule }         from '../shared/containers';
import { ComponentsModule }    from '../shared/components';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../shared/pipes';
import { FormsModule } from '@angular/forms';

const routes:Object[] = [{
  path:'sensor-details/:id',component:SensorDetailsComponent
}];

@NgModule({
  declarations:[SensorDetailsComponent],
  imports:[
    RouterModule.forChild(routes),
    ContainersModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule
  ]
})
export class SensorDetailsModule {}
