import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import { SensorDetailsService } from './services/sensor-details.service';

@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers:[MapService,SensorDetailsService]
})
export class SensorDetailsComponent {
  mapData:Object = null;
  allSensors:Array<any> = [];
  displayTiles:Object = null;
  orderBy: any = 'asc';
  gateway: any = 'all';
  private mapStatus = MapConstants.STATUS;
  constructor(private route:ActivatedRoute, private router:Router,private mapService:MapService,private sensorDetailsService:SensorDetailsService){
    this.route.params.subscribe((params)=>{
      console.log(params.id);
      this.sensorDetailsService.getData(params.id).then((e)=>{
        console.log('GOT E');
        console.log(e);
        this.mapData = e;
        e.Location.Network.Gateway.forEach((gate)=>{
          gate.Sensor.forEach((sens)=>{
            this.allSensors.push(sens);
          });
        });
      });
    });

  }

  gotoSummary(){
    this.router.navigate(['sensor-summary','I1']);
  }
}
