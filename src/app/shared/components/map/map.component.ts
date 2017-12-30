import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MapService } from './services/map.service';

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
  constructor(mapService:MapService){
    this.markers = mapService.getData();
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
}
