import { Component,ViewChild } from '@angular/core';
import { SensorDetailsService } from '../sensor-details/services/sensor-details.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chartjs-plugin-zoom';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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

export class SensorComparisonComponent {
  private sensorName:string = 'I12';
  private sensorNames:Array<Object> = [];
  private data:Array<any>=[];
  private chartLabels:Array<any>=[];
  private networkName:string = '';
  @ViewChild("baseChart") chart: BaseChartDirective;


  constructor(private sensorDetailsService:SensorDetailsService){
    this.sensorNames = this.getSensorNames();
    this.sensorDetailsService.getData('I12').then((result)=>{
      this.networkName = result.NetworkName;
      result.DataMessages.forEach((res)=>{
        this.data.push(res.PlotValue);
        this.chartLabels.push(new Date(res.MessageDate).toISOString().slice(11,19));
      });
    });
  }

  getSensorNames():Array<Object>{
    let allNames:Array<Object> = [];
    Promise.all([
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
    console.log(this.sensorName);
    let tempData = [];
    this.sensorDetailsService.getData('I13').then((result)=>{
      result.DataMessages.forEach((res)=>{
        tempData.push(res.PlotValue);
        this.chartLabels.push(new Date(res.MessageDate).toISOString().slice(11,19));
      });
      this.chartData.push({data:tempData,label:'Chart 2'});
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
      this.chart.chart.update();
    });
  }

  chartOptions = {
    responsive: true,
    // Container for pan options
    pan: {
      // Boolean to enable panning
      enabled: true,

      // Panning directions. Remove the appropriate direction to disable
      // Eg. 'y' would only allow panning in the y direction
      mode: 'xy',
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      }
    },

    // Container for zoom options
    zoom: {
      // Boolean to enable zooming
      enabled: true,

      // Enable drag-to-zoom behavior
      drag: true,

      // Zooming directions. Remove the appropriate direction to disable
      // Eg. 'y' would only allow zooming in the y direction
      mode: 'xy',
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max zoom range depends on scale type
        x: null,
        y: null
      }
    }
  };

  chartData = [
    { data: this.data, label: 'Temperature Vs. Time' },
  ];

  displayMonths = 2;
  navigation = 'select';

  onChartClick($event){
    console.log($event);
  }

  resetZoom(){
    this.chart.chart.resetZoom();
  }

  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
