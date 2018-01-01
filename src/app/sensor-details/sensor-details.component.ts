import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import { SensorDetailsService } from './services/sensor-details.service';

interface tileDetail{
  locationID:number;
  lat:number;
  lng:number;
  count:number;
  status:string;
  details:object;
}
@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers:[MapService,SensorDetailsService]
})
export class SensorDetailsComponent {
  mapData:Object = null;
  displayTiles:Object = null;
  orderBy: any = 'asc';
  gateway: any = '0';
  private mapStatus = MapConstants.STATUS;
  constructor(private route:ActivatedRoute, private mapService:MapService,private sensorDetailsService:SensorDetailsService){
    this.route.params.subscribe((params)=>{
      console.log(params.id);
      this.sensorDetailsService.getData(params.id).then((e)=>{
        this.mapData = e;
      });
    });

  }

  doSort(){
    console.log('i was called');
    console.log(this.orderBy);
  }

  handleRadio(event){
    console.log(event);
    console.log(this.gateway);
  }
}
