import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { TilesSandbox }  from './tiles.sandbox';
import { MapConstants } from '../../../shared/components/map/constants/map.constants';


@Component({
  selector:'app-tiles',
  styleUrls: ['./tiles.component.scss'],
  templateUrl:'./tiles.component.html',
  providers:[TilesSandbox]
})
export class TilesComponent {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Input() selectedLanguage : string;
  @Input() count: number;
  @Input() tileContent: string;
  @Input() tileColor: string;
  private mapStatus = MapConstants.STATUS;

  constructor(public tilesSandbox: TilesSandbox){

  }
  close(i){
    console.log(this.tilesSandbox);
        this.tilesSandbox.loadTiles();
        console.log(this.tilesSandbox);
    this.select.emit({code: 'test',number:i});
  }
  countChange(event) {
    console.log(this.tilesSandbox);
    console.log(event);
  }
  getTileColor(status){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
        return 'backColor-green';
      case this.mapStatus.ALERTS:
        return 'backColor-red';
      case this.mapStatus.LOW_SIGNAL:
        return 'backColor-yellow';
      case this.mapStatus.MISSED_COMMUNICATION:
        return 'backColor-orange';
      default:
        break;
    }
  }
}
