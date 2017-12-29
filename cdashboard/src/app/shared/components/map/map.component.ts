import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {AgmMap} from '@agm/core';

@Component({
  selector:'app-map',
  styleUrls: ['./map.component.scss'],
  template:`
  <agm-map [latitude]="lat" [longitude]="lng">
  <agm-marker
    [latitude]="lat"
    [longitude]="lng"
    (markerClick)="clickedMarker(lbl, i)">
    <agm-info-window>
    <strong>InfoWindow content</strong>
  </agm-info-window>
  </agm-marker>
  </agm-map>
  `
})
export class MapComponent {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  lbl: string = "Hello there. I am a marker!";
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
}
