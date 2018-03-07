import {
  Component,
  Output,
  Input,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { TileSandbox }  from '../../../shared/components/tile/tile.sandbox';
import { LoginSandbox } from '../../../auth/login/login.sandbox';
import * as store             from '../../../shared/store';
import { Store }              from '@ngrx/store';
import { Router }             from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as toasterActions    from '../../../shared/store/actions/toaster.action';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl:'./layout.container.html',
  providers: [ToastsManager]
})
export class LayoutContainer {
  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;
  private abc:          string = 'yoyo';
  private subscriptions: Array<Subscription> = [];
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  private toasterState = this.appState$.select(store.getToasterState);
  constructor(
    private tileSandbox:TileSandbox,
    protected appState$: Store<store.State>,
    private router:Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ){
    this.subscriptions.push(this.loginSandbox$.subscribe(e=>{
      console.log(e);
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.userEmail = user.username;
      this.userImage = '/assets/images/users/user.jpg';
    }));
    this.toastr.setRootViewContainerRef(vcr);
    console.log(this.toasterState);
    console.log(this.subscriptions);
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub)=>sub.unsubscribe());
  }

  select(){
  }

  countChange(data){
    this.abc = data.number;
  }

  private registerEvents() {
    // Subscribes to user changes
    this.subscriptions.push(this.tileSandbox.tilesLoaded$.subscribe(data=>{
    }));

    this.subscriptions.push(this.toasterState.subscribe((g)=>{
      if(g.TOASTER_SUCCESS){
        this.toastr.success(g.payload, 'Success!',{dismiss: 'click'}).then((e)=>{
          this.toasterState.dispatch(new toasterActions.SuccessAction());
        });
      } else if(g.TOASTER_ALERT){
        this.toastr.error(g.payload,'Warning!',{dismiss: 'click'}).then((e)=>{
          this.toasterState.dispatch(new toasterActions.AlertAction());
        });
      }
    }));
  }

  doLogout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("com.cdashboard.token");
    this.router.navigate(['login']);
  }


}
