import { NgModule } from '@angular/core';
import {SensorSummaryComponent } from './sensor-summary.component';
import {Route, RouterModule } from '@angular/router';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes';
import { FormsModule } from '@angular/forms';
import { FilterByCriteria } from './pipes/filterByCriteria.pipe';

const routes:Object[] = [{
  path:'dashboard/sensor-summary/:id',component:SensorSummaryComponent
}];

@NgModule({
  declarations:[SensorSummaryComponent,FilterByCriteria],
  imports:[
    RouterModule.forChild(routes),
    ContainersModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule
  ]
})
export class SensorSummaryModule {}
