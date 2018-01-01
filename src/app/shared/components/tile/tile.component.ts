import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { TileSandbox }  from './tile.sandbox';
import { MapConstants } from '../../../shared/components/map/constants/map.constants';


@Component({
  selector:'app-tile',
  styleUrls: ['./tile.component.scss'],
  templateUrl:'./tile.component.html',
  providers:[TileSandbox]
})
export class TileComponent {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Input() selectedLanguage : string;
  @Input() count?: number;
  @Input() tileContent: string;
  @Input() tileColor: string;
  @Input() tileColorBy?: string;
  @Input() tileDetails?: object;
  private mapStatus = MapConstants.STATUS;
  private mapConstants = MapConstants;
  constructor(public tileSandbox: TileSandbox){

  }
  close(i){
    console.log(this.tileSandbox);
    this.tileSandbox.loadTiles();
    console.log(this.tileSandbox);
    this.select.emit({code: 'test',number:i});
  }
  countChange(event) {
    console.log(this.tileSandbox);
    console.log(event);
  }
  getTileColor(status,tileColorBy){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
      return 'bg-purple';
      case this.mapStatus.ALERTS:
      return 'bg-pink';
      case this.mapStatus.LOW_SIGNAL:
      return 'bg-info';
      case this.mapStatus.MISSED_COMMUNICATION:
      return 'bg-warning';
      default:
      break;
    }
  }
  getTileStatus(number){
    switch(number){
      case this.mapConstants.STATUS_NUMBERS.GOOD:
      return 'bg-green';
      case this.mapConstants.STATUS_NUMBERS.MISSED_COMMUNICATION:
      return 'bg-warning';
      case this.mapConstants.STATUS_NUMBERS.ALERTS:
      return 'bg-pink';
      case this.mapConstants.STATUS_NUMBERS.LOW_SIGNAL:
      return 'bg-info';
      case this.mapConstants.STATUS_NUMBERS.LOW_BATTERY:
      return 'bg-purple';
    }
  }
  getTileIcon(color,tileColorBy){
    if(tileColorBy == 'status'){
      switch(color){
        case this.mapStatus.LOW_BATTERY:
        return 'fa-bolt';
        case this.mapStatus.ALERTS:
        return 'fa-bell';
        case this.mapStatus.LOW_SIGNAL:
        return 'fa-signal';
        case this.mapStatus.MISSED_COMMUNICATION:
        return 'fa-exclamation-circle';
        default:
        break;
      }
    }else {
      //here, status is a number
      switch(status){
        case this.mapConstants.STATUS_NUMBERS.GOOD:
        return 'bg-green';
        case this.mapConstants.STATUS_NUMBERS.MISSED_COMMUNICATION:
        return 'bg-warning';
        case this.mapConstants.STATUS_NUMBERS.ALERTS:
        return 'bg-pink';
        case this.mapConstants.STATUS_NUMBERS.LOW_SIGNAL:
        return 'bg-info';
        case this.mapConstants.STATUS_NUMBERS.LOW_BATTERY:
        return 'bg-purple';
      }
    }
  }
}
