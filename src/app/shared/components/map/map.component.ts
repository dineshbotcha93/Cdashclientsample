import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MapService } from './services/map.service';
import { MapConstants } from './constants/map.constants';

@Component({
  selector:'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  providers:[MapService]
})
export class MapComponent {
  title: string = 'My first AGM project';
  lbl: string = "Hello there. I am a marker!";
  markers: Array<Object> = null;
  private mapStatus = MapConstants.STATUS;
  constructor(mapService:MapService){
    this.markers = mapService.getData();
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  getIcon(status:string){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
        return 'assets/images/tempMarkers/temp-green.png';
      case this.mapStatus.ALERTS:
        return 'assets/images/tempMarkers/temp-red.png';
      case this.mapStatus.LOW_SIGNAL:
        return 'assets/images/tempMarkers/temp-yellow.png';
      case this.mapStatus.MISSED_COMMUNICATION:
        return 'assets/images/tempMarkers/temp-orange.png';
      default:
        break;
    }
  }
}
