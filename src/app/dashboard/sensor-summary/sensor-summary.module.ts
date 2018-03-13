import { NgModule } from '@angular/core';
import { SensorSummaryComponent } from './sensor-summary.component';
import { Routes, RouterModule } from '@angular/router';
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
import { SharedModule } from '../../shared/modules/shared.module';


import { ButtonsModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { ModalModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';




const routes:Routes = [{
  path:'',component:SensorSummaryComponent
}];

@NgModule({
 declarations:[
    SensorSummaryComponent,
    FilterByCriteria,
    SlideAbleDirective,
    Ng2StyledDirective,
    Ng2SliderComponent,
    CreateDeviceComponent],
  imports:[
    RouterModule.forChild(routes),
    ContainersModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule,
    AngularFontAwesomeModule,
    SharedModule, ButtonsModule.forRoot(),TimepickerModule.forRoot(),MultiselectDropdownModule,BsDatepickerModule.forRoot(),ModalModule.forRoot()

  ],
  exports: [
    Ng2SliderComponent,
    Ng2StyledDirective,
    CreateDeviceComponent,
    RouterModule
  ]
})
export class SensorSummaryModule {}
