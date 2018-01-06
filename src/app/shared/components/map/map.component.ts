import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MapService } from './services/map.service';
import { MapConstants } from './constants/map.constants';
import { Router } from '@angular/router';

@Component({
  selector:'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  providers:[MapService]
})

export class MapComponent {
  @Input() markers: object;
  private mapStatus = MapConstants.STATUS;
  constructor(private router:Router){
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label} and count ${index}`);
    this.router.navigate(['sensor-details',index]);
  }
}
