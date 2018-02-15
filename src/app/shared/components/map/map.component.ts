import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MapService } from './services/map.service';
import { MapConstants } from './constants/map.constants';
import { Router } from '@angular/router';
import { AgmMap } from '@agm/core';

@Component({
  selector:'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  providers:[MapService]
})

export class MapComponent implements AfterViewInit {
  @Input() markers: object;
  @ViewChild(AgmMap) agmMap: any;
  private mapStatus = MapConstants.STATUS;
  constructor(private router:Router){
  }

  ngAfterViewInit(){
    this.agmMap._mapsWrapper.triggerMapEvent('resize');
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label} and count ${index}`);
    this.router.navigate(['dashboard/sensor-summary',index]);
  }
  
  onResize(event){
    let newLat;
    let newLng;
    this.agmMap._mapsWrapper.getCenter().then((e)=>{
      newLat = e.lat();
      newLng = e.lng();
    });
    this.agmMap.triggerResize(true).then(() =>  this.agmMap._mapsWrapper.setCenter({lat: newLat, lng: newLng}));
  }
}
