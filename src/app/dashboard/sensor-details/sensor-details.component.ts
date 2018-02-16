import { Component,ViewChild,ViewChildren,QueryList,ChangeDetectorRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorDetailsService } from './services/sensor-details.service';
import { Router,ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartOptions } from './config/chart.config';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers:[SensorDetailsService],
  encapsulation: ViewEncapsulation.None,
})
export class SensorDetailsComponent {
  private result;
  private sensorDetailsData;
  private rows:Array<any>=['N/A'];
  private columns:Array<any>=[];
  private limit:number = 10;
  private data:Array<any>=[];
  private chartLabels:Array<any>=[];
  private chartOptions = null;
  @ViewChild("baseChart") chart: BaseChartDirective;
  @ViewChildren("tabs") tabs: QueryList<any>

  constructor(
    private sensorDetailsService:SensorDetailsService,
    private router:Router,
    private route:ActivatedRoute,
    private cd: ChangeDetectorRef){
    this.chartOptions = ChartOptions;
    let detailId = '';
    this.route.params.subscribe((params)=>{
      detailId = params.id.toString();
   });
    sensorDetailsService.getDetails(detailId).then((result)=>{
      this.sensorDetailsData = result;
    });
    sensorDetailsService.getDataMessages(detailId).then((result)=>{
      this.result = result;
      this.rows = [];
      result.forEach((res)=>{
        this.data.push(res.plotValue);
        this.chartLabels.push(new Date(res.messageDate).toISOString().slice(11,19));
        this.rows.push({
          messageID:res.messageID,
          data:res.data,
          messageDate:res.messageDate,
          signalStrength:res.signalStrength,
          voltage:res.voltage,
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

  ngAfterViewInit(){
    this.tabs.forEach((e)=>{
      e.tabs.forEach((tab)=>{
        if(tab.tabTitle=='Graph'){
          tab.active = true;
        } else {
          tab.active = false;
        }
      })
      this.cd.detectChanges();
    })
  }

  chartData = [
    { data: this.data, label: 'Temperature Vs. Time',fill:false },
  ];


  onChartClick(event) {
    console.log(event);
  }
}
