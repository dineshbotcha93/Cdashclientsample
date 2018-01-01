import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';

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
  providers:[MapService]
})
export class SensorDetailsComponent {
  mapData:Object = null;
  displayTiles:Object = null;
  orderBy: any = 'asc';
  private mapStatus = MapConstants.STATUS;
  constructor(private route:ActivatedRoute, private mapService:MapService){
    this.mapData = this.mapService.getSensorList();
  }

  doSort(){
    console.log('i was called');
    console.log(this.orderBy);
  }
}
