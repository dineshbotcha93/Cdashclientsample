import { Component,ViewChild } from '@angular/core';
import { SensorDetailsService } from '../sensor-details/services/sensor-details.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chartjs-plugin-zoom';
import { ChartOptions } from './config/chart.config';


interface SensorDetail{
  SensorName:string;
}
const now = new Date();

@Component({
  selector:'app-sensor-comparison',
  templateUrl:'./sensor-comparison.component.html',
  providers:[SensorDetailsService],
  styleUrls: ['./sensor-comparison.component.scss'],
})

export class SensorComparisonComponent{
  private sensorName:string = 'I12';
  private sensorNames:Array<Object> = [];
  private data:Array<any>=[];
  private chartLabels:Array<any>=[];
  private networkName:string = '';
  private location:number = 0;
  private chartOptions = null;
  @ViewChild("baseChart") chart: BaseChartDirective;


  constructor(private sensorDetailsService:SensorDetailsService){
    this.sensorNames = this.getSensorNames();
    this.chartOptions = ChartOptions;
  }

  getSensorNames():Array<Object>{
    let allNames:Array<Object> = [];
    Promise.all([
      this.sensorDetailsService.getData('I11'),
      this.sensorDetailsService.getData('I12'),
      this.sensorDetailsService.getData('I13'),
      this.sensorDetailsService.getData('I14')
    ]).then((result:Array<SensorDetail>)=>{
      result.forEach((res:SensorDetail)=>{
        console.log(res);
        allNames.push({label:res.SensorName,value:'I12'});
      });
    });
    return allNames;
  }

  test(){
    console.log(this.sensorName);
  }

  addSensor(){
    this.location++;
    let tempData = [];
    let totalLocation = 10+this.location;
    this.sensorDetailsService.getData('I'+totalLocation).then((result)=>{
      result.DataMessages.forEach((res)=>{
        tempData.push(res.PlotValue);
        this.chartLabels.push(new Date(res.MessageDate).toISOString().slice(11,19));
      });
      this.chartData.push({data:tempData,label:'Sensor '+this.location});
      if(this.chart){
        this.chart.ngOnDestroy();
        this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        this.chart.chart.update();
      }
    });
  }

  chartData = [];

  displayMonths = 2;
  navigation = 'select';

  onChartClick($event){
    console.log($event);
  }

  resetZoom(){
    this.chart.chart.resetZoom();
  }

  date: {year: number, month: number};

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsValueTwo: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
