import {
  Component,
  Output,
  Input,
} from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { TilesSandbox }  from '../../../shared/components/tiles/tiles.sandbox';
import { Store }      	          from '@ngrx/store';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <app-header
      [userImage]="userImage"
      [userEmail]="userEmail">
    </app-header>
    <navigation></navigation>
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
    <app-tiles [selectedLanguage]="abc" (click)="select()" (select)="countChange($event)">
    <h3>{{selectedLanguage}}</h3>
    </app-tiles>

  `
})
export class LayoutContainer {
  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;
  private abc:          string = 'yoyo';
  private subscriptions: Array<Subscription> = [];

  constructor(private tilesSandbox:TilesSandbox){

  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  select(){
    console.log('test');
  }
  countChange(data){
    this.abc = data.number;
  }

  private registerEvents() {
    console.log('registering');
    // Subscribes to user changes
    this.tilesSandbox.tilesLoaded$.subscribe(data=>{
      console.log(data);
    });
  }
}
