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
  private rows:Array<any>=[];
  private columns:Array<any>=[];
  private limit:number = 10;
  private data:Array<any>=[];
  private chartLabels:Array<any>=[];
  constructor(private sensorSummaryService:SensorDetailsService){
    sensorSummaryService.getData('I11').then((result)=>{
      this.result = result;
      result.DataMessages.forEach((res)=>{
        this.data.push(res.PlotValue);
        this.chartLabels.push(new Date(res.MessageDate).toISOString().slice(11,19));
        this.rows.push({
          messageID:res.MessageID,
          data:res.Data,
          messageDate:res.MessageDate,
          signalStrength:res.SignalStrength,
          voltage:res.Voltage,
          test:'<i class="fa fa-signal"></i>'
        });
      });
    });
    this.columns.push({prop:'messageID',name:'Message ID'});
    this.columns.push({prop:'data',name:'Data'});
    this.columns.push({prop:'messageDate',name:'Message Date'});
    this.columns.push({prop:'signalStrength',name:'Signal Strength'});
    this.columns.push({prop:'voltage',name:'Voltage'});
    this.columns.push({prop:'test',name:'Test'});
  }
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: this.data, label: 'Temperature Vs. Time' },
  ];


  onChartClick(event) {
    console.log(event);
  }
}
