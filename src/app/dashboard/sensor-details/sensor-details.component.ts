import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorDetailsService } from './services/sensor-details.service';

@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers:[SensorDetailsService],
  encapsulation: ViewEncapsulation.None,
})
export class SensorDetailsComponent {
  private result;
  constructor(private sensorSummaryService:SensorDetailsService){
    sensorSummaryService.getData('I11').then((result)=>{
      this.result = result;
    })
  }
}
