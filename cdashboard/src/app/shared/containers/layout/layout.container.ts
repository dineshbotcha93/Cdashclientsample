import {
  Component,
  Output,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { TilesSandbox }  from '../../../shared/components/tiles/tiles.sandbox';
import { LoginSandbox } from '../../../auth/login/login.sandbox';
import * as store             from '../../../shared/store';
import { Store }              from '@ngrx/store';
import { Router }             from '@angular/router';
@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="col-md-3 left_col">
  <navigation></navigation>
  </div>
    <app-header
      [userImage]="userImage"
      [userEmail]="userEmail"
      (logout)="doLogout()">
    </app-header>
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
    <app-tiles [selectedLanguage]="abc" (click)="select()" (select)="countChange($event)">
    <h3>{{selectedLanguage}}</h3>
    </app-tiles>
    <app-map></app-map>
    <app-datatable></app-datatable>
  `
})
export class LayoutContainer {
  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;
  private abc:          string = 'yoyo';
  private subscriptions: Array<Subscription> = [];
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);

  constructor(private tilesSandbox:TilesSandbox,protected appState$: Store<store.State>,private router:Router){
    this.loginSandbox$.subscribe(e=>{
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.userEmail = user.username;
      this.userImage = '/assets/images/users/user.jpg';
    });
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  select(){
  }

  countChange(data){
    this.abc = data.number;
  }

  private registerEvents() {
    // Subscribes to user changes
    this.tilesSandbox.tilesLoaded$.subscribe(data=>{
      console.log(data);
    });
  }

  doLogout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['login']);
  }

}
