import { NgModule } from '@angular/core';
import { SensorComparisonComponent } from './sensor-comparison.component';
import {Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


const routes:Object[] = [{
  path:'dashboard/sensor-comparison/:id',component:SensorComparisonComponent
}]

@NgModule({
  declarations:[SensorComparisonComponent],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule,
    ChartsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class SensorComparisonModule {}
