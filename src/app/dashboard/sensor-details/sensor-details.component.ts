import { Component,ViewChild,ViewChildren,QueryList,ChangeDetectorRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorDetailsService } from './services/sensor-details.service';
import { Router,ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartOptions } from './config/chart.config';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import * as moment from 'moment/moment';

@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers:[SensorDetailsService,AlertSandbox],
  encapsulation: ViewEncapsulation.None,
})
export class SensorDetailsComponent {
  private result;
  private sensorDetailsData;
  private detailId;
  private rows:Array<any>=['N/A'];
  private columns:Array<any>=[];
  private limit:number = 10;
  private data:Array<any>=[];
  private chartLabels:Array<any>=[];
  private chartOptions = null;
  @ViewChild("baseChart") chart: BaseChartDirective;
  @ViewChildren("tabs") tabs: QueryList<any>
  bsValue: Date = new Date();
  bsValueTwo: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  constructor(
    private sensorDetailsService:SensorDetailsService,
    private router:Router,
    private route:ActivatedRoute,
    private alertSandbox: AlertSandbox,
    private cd: ChangeDetectorRef){
    this.chartOptions = ChartOptions;
    this.route.params.subscribe((params)=>{
      this.detailId = params.id.toString();
   });
    sensorDetailsService.getDetails(this.detailId).then((result)=>{
      this.sensorDetailsData = result;
    });
    this.columns.push({prop:'messageID',name:'Message ID'});
    this.columns.push({prop:'data',name:'Data'});
    this.columns.push({prop:'messageDate',name:'Message Date'});
    this.columns.push({prop:'signalStrength',name:'Signal Strength'});
    this.columns.push({prop:'voltage',name:'Voltage'});

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

  onDateChange(event){
    const fromDate = moment(this.bsValue).format('DD/MM/YYYY');
    const toDate = moment(this.bsValueTwo).format('DD/MM/YYYY');
    this.sensorDetailsService.getDataMessages(this.detailId,fromDate,toDate).then((result)=>{
      this.result = result;
      this.rows = [];
      if(this.result.length == 0){
        this.alertSandbox.showAlert({data:'No Content'});
        return;
      }
      result.forEach((res)=>{
        this.data.push(res.plotValue);
        this.chartLabels.push(moment(res.messageDate).format('DD/MM/YYYY hh:mm:ss').substring(11,19));
        this.rows.push({
          messageID:res.messageID,
          data:res.plotValue,
          messageDate:moment(res.messageDate).format('DD/MM/YYYY hh:mm:ss'),
          signalStrength:res.signalStrength,
          voltage:res.voltage,
        });
      });
    }).catch((e)=>{
      this.alertSandbox.showAlert({data:'No Content'});
    });
  }

  reset(attribute){
    if(attribute=='zoom'){
      this.chart.chart.resetZoom();
    }
  }

  chartData = [
    { data: this.data, label: 'Temperature Vs. Time',fill:false },
  ];


  onChartClick(event) {
    console.log(event);
  }

  goBack(){
    let networkId = localStorage.getItem("com.cdashboard.networkId");
    this.router.navigate(['dashboard/sensor-summary',networkId]);
  }
}
