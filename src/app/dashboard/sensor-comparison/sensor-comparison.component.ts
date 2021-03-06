import { Component,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SensorDetailsService } from '../sensor-details/services/sensor-details.service';
import { SensorSummaryService } from '../sensor-summary/services/sensor-summary.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chartjs-plugin-zoom';
import { ChartOptions, ChartColors } from '../chart.config';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment/moment';

interface SensorDetail{
  sensorName:string;
  sensorID:number;
}

const now = new Date();

@Component({
  selector:'app-sensor-comparison',
  templateUrl:'./sensor-comparison.component.html',
  providers:[SensorDetailsService, SensorSummaryService],
  styleUrls: ['./sensor-comparison.component.scss'],
})

export class SensorComparisonComponent{
  public sensorName:String = '';
  public sensorNames:Array<Object> = [];
  private data:Array<any>=[];
  public chartLabels:Array<any>=[];
  public chartColors: Array<any> = [ChartColors];
  public networkName:string = '';
  private location:number = 0;
  public chartOptions: any = ChartOptions;
  private netWorkId = null;
  @ViewChild("baseChart") chart: BaseChartDirective;

  date: {year: number, month: number};

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = moment().subtract(6,'days').toDate();
  bsValueTwo: Date = moment().toDate();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  constructor(private sensorDetailsService:SensorDetailsService,
    private sensorSummaryService: SensorSummaryService,
    private router:Router,
    private route:ActivatedRoute,
    private translate: TranslateService
  ){
    this.sensorNames = this.getSensorNames();
    this.chartOptions = ChartOptions;
    this.chartOptions.legend = {
      labels: {
        fontColor: '#333'
      },
      onClick:function(e,legendItem){
        this.sensorNames.push({
          label:this.chartData[legendItem.datasetIndex].label,
          value:this.chartData[legendItem.datasetIndex].value
        });
        this.chartData.splice(legendItem.datasetIndex,1);
        if(this.chartData.length == 0){
          this.chartData = [];
        } else{
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
          this.chart.chart.update();
        }
      }.bind(this)
    }

    this.translate.use('en');
  }

  getSensorNames():Array<Object>{
    let allNames:Array<Object> = [];
    let allSensorIds: Array<Object> = [];
    this.netWorkId = localStorage.getItem("com.cdashboard.selectedNetworkId");
      this.sensorSummaryService.getSingleUserLocation(this.netWorkId).then((result)=>{
        result.sensors.forEach((allSensors)=>{
          allSensorIds.push(this.sensorDetailsService.getDetails(allSensors.sensorID));
        });
        return allSensorIds;
      }).then((allSensorIds)=>{
        Promise.all(allSensorIds).then((result:Array<SensorDetail>)=>{
          allNames.push({label:'--Select Sensor --',value:''});
          result.forEach((res:SensorDetail)=>{
            allNames.push({label:res.sensorName,value:res.sensorID});
          });
        });
      });
    return allNames;
  }

  test(){
  }

  onDateChange(event, target) {
    console.log(event);
    // let fromDate = moment(this.bsValue).format('MM/DD/YYYY');
    // let toDate = moment(this.bsValueTwo).format('MM/DD/YYYY');

    // if (target === 'fromDate') {
    //   fromDate = moment(event).format('MM/DD/YYYY');
    // } else {
    //   toDate = moment(event).format('MM/DD/YYYY');
    // }
  }
 
  addSensor(){
    let tempData = [];
    this.location++;
    const selectedSensor = this.sensorNames.filter((sens)=>(sens['value'] == this.sensorName) ? sens: '');
    this.sensorNames = this.sensorNames.filter((sens)=>(sens['value']!=this.sensorName)? sens:'');
    let totalLocation = 10+this.location;
    if(this.sensorName!==''){
      const fromDate = moment(this.bsValue).format('MM/DD/YYYY');
      const toDate = moment(this.bsValueTwo).format('MM/DD/YYYY');
      this.sensorDetailsService.getDataMessages(this.sensorName,fromDate,toDate).then((result)=>{
        result.forEach((res)=>{
          if(this.chartLabels.indexOf(new Date(res.messageDate).toISOString().slice(11,19))==-1){
            tempData.push(res.plotValue);
            this.chartLabels.push(new Date(res.messageDate).toISOString().slice(11,19));
          }
        });
        const filteredData = this.sensorNames.filter((sens)=>{
          if(this.netWorkId == sens['value']){
            return sens;
          }
        });
        const borderColor = ["#3e95cd","#8e5ea2","#3cba9f","#e8c3b9"]
        this.chartData.push({
          data:tempData,
          label:selectedSensor[0]['label'],
          fill:false,
          borderColor: borderColor[this.location],
        });
        if(this.chart){
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
          this.chart.chart.update();
        }
      });
    } else {
      alert('Please select a sensor from the dropdown');
    }
    this.sensorName = '';
  }

  chartData = [];

  displayMonths = 2;
  navigation = 'select';

  onChartClick($event){
    console.log($event);
  }

  reset(attribute){
    if(attribute=='zoom'){
      this.chart.chart.resetZoom();
    } else if(attribute == 'chart'){
      this.sensorNames = this.getSensorNames();
      this.chartData = [];
      this.chartLabels = [];
      this.location = 0;
      this.sensorName = '';
      if(!environment.production){
        this.sensorName = '1156073157';
      }
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
      this.chart.chart.update();
    }
  }

  print(){
    var win=window.open();
    win.document.write("<html><head><title>Print Chart</title></head><body>");
    win.document.write("<br><img src='"+this.chart.chart.toBase64Image('image/png')+"' onload='print()' style='width:90%'/>");
    win.document.write("</body></html>");
  }

  goBack(){
    let networkId = localStorage.getItem("com.cdashboard.selectedNetworkId");
    this.router.navigate(['dashboard/sensor-summary',networkId]);
  }
}
