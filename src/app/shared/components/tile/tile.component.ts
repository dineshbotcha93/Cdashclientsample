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
  providers:[TileSandbox],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() customClick = new EventEmitter<MouseEvent>();
  @Input() selectedLanguage : string;
  @Input() count?: number;
  @Input() tileContent: string;
  @Input() tileColor: string;
  @Input() tileColorBy?: string;
  @Input() tileDetails?: object;
  @Input() sensorTileIcon?: string;
  @Input() sensor?: any;
  private mapStatus = MapConstants.STATUS;
  private mapConstants = MapConstants;
  constructor(public tileSandbox: TileSandbox){
  }
  handleClick(event: MouseEvent) {
        this.customClick.emit(event);
    }
  close(i){
    console.log(this.tileSandbox);
    this.tileSandbox.loadTiles();
    console.log(this.tileSandbox);
    this.select.emit({code: 'test', number: i});
  }
  countChange(event) {
    console.log(this.tileSandbox);
    console.log(event);
  }
  getTileColor(status,tileColorBy,tileContent){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
      return 'bg-lowBattery';
      case this.mapStatus.ALERTS:
      console.log("TILE CONTENT "+tileContent);
      return 'bg-pink';
      case this.mapStatus.LOW_SIGNAL:
      return 'bg-info';
      case this.mapStatus.MISSED_COMMUNICATION:
      return 'bg-warning';
      case this.mapStatus.DEFAULTERS:
      return 'bg-pink';
      case this.mapStatus.NEW_CUSTOMERS:
      return 'bg-info';
      case this.mapStatus.DUE_CUSTOMERS:
      return 'bg-lowBattery';
      case this.mapStatus.RENEWED_CUSTOMERS:
      return 'bg-success';
      case this.mapStatus.OUTSTANDING_BALANCE:
      return 'bg-lowBattery';
      case this.mapStatus.RECENT_PAYMENTS:
      return 'bg-info';
      default:
      break;
    }
  }
  getTileStatusByColorNum(number,tileContent){
    switch(number){
      case this.mapConstants.NEW_STATUS_NUMBERS.OK:
      return 'bg-green';
      case this.mapConstants.NEW_STATUS_NUMBERS.INACTIVE:
      return 'bg-warning';
      case this.mapConstants.NEW_STATUS_NUMBERS.ALERT:
      const recordedTemp = parseFloat(tileContent);
      if(this.sensor.status !== this.mapConstants.SENSOR_TYPE.CONTACT){
        if(recordedTemp > this.sensor.minimumThreshold){
          return 'bg-warning';
        } else if(recordedTemp > this.sensor.maximumTreshold){
          return 'bg-pink';
        }
      }
      case this.mapConstants.NEW_STATUS_NUMBERS.SLEEPING:
      return 'bg-info';
      case this.mapConstants.NEW_STATUS_NUMBERS.WARNING:
      return 'bg-lowBattery';
    }
  }

  getSensorTileIcon(sensorType,tileContent){
      switch(sensorType){
        case this.mapConstants.SENSOR_TYPE.TEMP:
        return 'fa-thermometer-half';
        case this.mapConstants.SENSOR_TYPE.HUMIDITY:
        return 'fa-tint';
        case (this.mapConstants.SENSOR_TYPE.CONTACT):
        if(tileContent == 'Closed'){
          return 'fa-lock';
        } else {
          return 'fa-lock-open';
        }
        default:
        return 'fa-tablet';
    }
  }

  getTileStatusTextByColorNum(color){
    //here, status is a number
    switch(color){
      case this.mapConstants.STATUS_NUMBERS.GOOD:
      return this.mapConstants.READABLE_STATUS.GOOD;
      case this.mapConstants.STATUS_NUMBERS.MISSED_COMMUNICATION:
      return this.mapConstants.READABLE_STATUS.MISSED_COMMUNICATION;
      case this.mapConstants.STATUS_NUMBERS.ALERTS:
      return this.mapConstants.READABLE_STATUS.ALERTS;
      case this.mapConstants.STATUS_NUMBERS.LOW_SIGNAL:
      return this.mapConstants.READABLE_STATUS.LOW_SIGNAL;
      case this.mapConstants.STATUS_NUMBERS.LOW_BATTERY:
      return this.mapConstants.READABLE_STATUS.LOW_BATTERY;
    }
  }

  getTileStatusIconByColorNum(color){
    //here, color is a number
    switch(color){
      case this.mapConstants.STATUS_NUMBERS.GOOD:
      return 'bg-green';
      case this.mapConstants.STATUS_NUMBERS.MISSED_COMMUNICATION:
      return 'fa-exclamation-circle';
      case this.mapConstants.STATUS_NUMBERS.ALERTS:
      return 'fa-bell';
      case this.mapConstants.STATUS_NUMBERS.LOW_SIGNAL:
      return 'fa-signal';
      case this.mapConstants.STATUS_NUMBERS.LOW_BATTERY:
      return 'fa-battery-three-quarters';
    }
  }

  getTileIcon(color,tileColorBy){
    if(tileColorBy == 'status'){
      switch(color){
        case this.mapStatus.LOW_BATTERY:
        return 'fa-battery-three-quarters';
        case this.mapStatus.ALERTS:
        return 'fa-bell';
        case this.mapStatus.LOW_SIGNAL:
        return 'fa-signal';
        case this.mapStatus.MISSED_COMMUNICATION:
        return 'fa-exclamation-circle';
        case this.mapConstants.STATUS.DEFAULTERS:
        return 'fa-user-times';
        case this.mapConstants.STATUS.DUE_CUSTOMERS:
        return 'fa-user-circle-o';
        case this.mapConstants.STATUS.RENEWED_CUSTOMERS:
        return 'fa-user-circle';
        case this.mapConstants.STATUS.NEW_CUSTOMERS:
        return 'fa-user-plus';
        default:
        break;
      }
    } else {
      //here, status is a number
      switch(color){
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
