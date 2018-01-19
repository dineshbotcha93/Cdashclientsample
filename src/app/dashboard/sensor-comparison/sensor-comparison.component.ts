import { Component,ViewChild } from '@angular/core';
import { SensorDetailsService } from '../sensor-details/services/sensor-details.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chartjs-plugin-zoom';
import { ChartOptions } from './config/chart.config';


interface SensorDetail{
  SensorName:string;
  SensorID:number;
}

const now = new Date();

@Component({
  selector:'app-sensor-comparison',
  templateUrl:'./sensor-comparison.component.html',
  providers:[SensorDetailsService],
  styleUrls: ['./sensor-comparison.component.scss'],
})

export class SensorComparisonComponent{
  private sensorName:string = '1156073157';
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
      this.sensorDetailsService.getData('1156073157'),
      this.sensorDetailsService.getData('1156073158'),
      this.sensorDetailsService.getData('1156073159'),
      this.sensorDetailsService.getData('1156073160')
    ]).then((result:Array<SensorDetail>)=>{
      result.forEach((res:SensorDetail)=>{
        allNames.push({label:res.SensorName,value:res.SensorID});
      });
    });
    return allNames;
  }

  test(){
    console.log(this.sensorName);
  }

  addSensor(){
    let tempData = [];
    this.location++;
    this.sensorNames = this.sensorNames.filter((sens)=>(sens['value']!=this.sensorName)? sens:'');
    let totalLocation = 10+this.location;
    if(this.sensorName!==''){
      this.sensorDetailsService.getData(this.sensorName).then((result)=>{
        result.DataMessages.forEach((res)=>{
          tempData.push(res.PlotValue);
          if(this.chartLabels.indexOf(new Date(res.MessageDate).toISOString().slice(11,19))==-1){
            this.chartLabels.push(new Date(res.MessageDate).toISOString().slice(11,19));
          }
        });
        this.chartData.push({data:tempData,label:result.SensorName});
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
      this.sensorName = '1156073157';
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
    // win.document.close();
    // win.print();
    // win.close();
    //     let popupWinindow
    //  let innerContents = document.getElementsByClassName("chartjs-size-monitor")[0].innerHTML;
    // console.log(innerContents);
    //  popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    //  popupWinindow.document.open();
    //  popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    //  popupWinindow.document.close();
  }

  date: {year: number, month: number};

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsValueTwo: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
