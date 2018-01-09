import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorSummaryService } from './services/sensor-summary.service';

@Component({
  selector:'app-sensor-summary',
  templateUrl:'./sensor-summary.component.html',
  styleUrls: ['./sensor-summary.component.scss'],
  providers:[SensorSummaryService],
  encapsulation: ViewEncapsulation.None,
})
export class SensorSummaryComponent {
  private result;
  constructor(private sensorSummaryService:SensorSummaryService){
    sensorSummaryService.getData('I11').then((result)=>{
      this.result = result;
    })
  }
}
