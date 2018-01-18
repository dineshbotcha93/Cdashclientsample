import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../../shared/components/map/services/map.service';
import { MapConstants } from '../../shared/components/map/constants/map.constants';
import { SensorSummaryService } from './services/sensor-summary.service';

@Component({
  selector:'app-sensor-summary',
  templateUrl:'./sensor-summary.component.html',
  styleUrls: ['./sensor-summary.component.scss'],
  providers:[MapService,SensorSummaryService]
})

export class SensorSummaryComponent {
  mapData:Object = null;
  allSensors:Array<any> = [];
  displayTiles:Object = null;
  orderBy: any = 'asc';
  gateway: any = 'all';
  originalSensor:Array<any> = [];
  originalMapSensor:Object = null;
  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;
  constructor(private route:ActivatedRoute, private router:Router,private mapService:MapService,private sensorSummaryService:SensorSummaryService){
    this.route.params.subscribe((params)=>{
      console.log(params.id);
      this.sensorSummaryService.getData(params.id).then((e)=>{
        console.log('GOT E');
        console.log(e);
        this.mapData = e;
        this.originalMapSensor = this.mapData;
        e.Location.Network.Gateway.forEach((gate)=>{
          gate.Sensor.forEach((sens)=>{
            this.allSensors.push(sens);
          });
        });
        this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
      });
    });

  }

  gotoSummary(){
    this.router.navigate(['dashboard/sensor-details','I1']);
  }

  filterName(){
    if(this.gateway=='all'){
      this.allSensors = this.originalSensor.filter((sens)=>sens.SensorName.indexOf(this.doFilterByName) > -1 ? sens:'',this);
      if(this.doFilterByName == ''){
        this.allSensors = this.originalSensor;
      }
    }
  }

  doCompare(){
    this.router.navigate(['dashboard/sensor-comparison','I1']);
  }
}
