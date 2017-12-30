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
import {MapService}           from '../../../shared/components/map/services/map.service';
@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl:'./layout.container.html',
  providers: [MapService]
})
export class LayoutContainer {
  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;
  private abc:          string = 'yoyo';
  private subscriptions: Array<Subscription> = [];
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  private mapData:Array<Object> = null;
  constructor(
    private tilesSandbox:TilesSandbox,
    protected appState$: Store<store.State>,
    private router:Router,
    private mapService:MapService){
    this.loginSandbox$.subscribe(e=>{
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.userEmail = user.username;
      this.userImage = '/assets/images/users/user.jpg';
    });

    this.mapData = mapService.getData();
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
