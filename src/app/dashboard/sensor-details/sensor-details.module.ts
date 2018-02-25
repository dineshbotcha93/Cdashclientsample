import { NgModule } from '@angular/core';
import {SensorDetailsComponent } from './sensor-details.component';
import {Routes, RouterModule } from '@angular/router';
import { ContainersModule }         from '../../shared/containers';
import { ComponentsModule }    from '../../shared/components';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/modules/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './modals/modalContent.component';


const routes:Routes= [{
  path:'',component:SensorDetailsComponent
}];

@NgModule({
  declarations:[SensorDetailsComponent,ModalContentComponent],
  imports:[
    RouterModule.forChild(routes),
    ContainersModule,
    ComponentsModule,
    CommonModule,
    PipesModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents:[ModalContentComponent]
})
export class SensorDetailsModule {}
