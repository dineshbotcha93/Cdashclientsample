import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { TilesSandbox }  from './tiles.sandbox';


@Component({
  selector:'app-tiles',
  styleUrls: ['./tiles.component.scss'],
  template: `
  <div *ngFor="let i of [1,2,3,4]" class='tiles'>
  <h3>Tile</h3>
  {{selectedLanguage}}
  <ng-content></ng-content>
  <span class="close" (click)="close(i)">X</span>
  </div>
  `,
  providers:[TilesSandbox]
})
export class TilesComponent {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Input() selectedLanguage : string;
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
}
