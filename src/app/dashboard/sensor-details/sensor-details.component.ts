import { Component,ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorDetailsService } from './services/sensor-details.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartOptions } from './config/chart.config';

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
  private chartOptions = null;
  @ViewChild("baseChart") chart: BaseChartDirective;

  constructor(private sensorSummaryService:SensorDetailsService,private router:Router){
    this.chartOptions = ChartOptions;

    sensorSummaryService.getData('1156073157').then((result)=>{
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

    this.chartOptions = ChartOptions;

    this.chartOptions.legend = {
      onClick:function(e){
        e.preventDefault();
      }
    }
  }

  chartData = [
    { data: this.data, label: 'Temperature Vs. Time',fill:false },
  ];


  onChartClick(event) {
    console.log(event);
  }
}
