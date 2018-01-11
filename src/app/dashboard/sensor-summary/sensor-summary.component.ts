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
  private mapStatus = MapConstants.STATUS;
  constructor(private route:ActivatedRoute, private router:Router,private mapService:MapService,private sensorSummaryService:SensorSummaryService){
    this.route.params.subscribe((params)=>{
      console.log(params.id);
      this.sensorSummaryService.getData(params.id).then((e)=>{
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
    this.router.navigate(['dashboard/sensor-details','I1']);
  }
}
