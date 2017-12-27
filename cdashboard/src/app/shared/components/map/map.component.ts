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
    <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
    </agm-map>
  `
})
export class MapComponent {
  title: string = 'My first AGM project';
lat: number = 51.678418;
lng: number = 7.809007;
}
