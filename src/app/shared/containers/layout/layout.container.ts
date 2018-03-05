import {
  Component,
  Output,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { TileSandbox }  from '../../../shared/components/tile/tile.sandbox';
import { LoginSandbox } from '../../../auth/login/login.sandbox';
import * as store             from '../../../shared/store';
import { Store }              from '@ngrx/store';
import { Router }             from '@angular/router';
@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl:'./layout.container.html',
  providers: []
})
export class LayoutContainer {
  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;
  private abc:          string = 'yoyo';
  private subscriptions: Array<Subscription> = [];
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  constructor(
    private tileSandbox:TileSandbox,
    protected appState$: Store<store.State>,
    private router:Router){
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
    this.tileSandbox.tilesLoaded$.subscribe(data=>{
    });
  }

  doLogout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("com.cdashboard.token");
    this.router.navigate(['login']);
  }


}
