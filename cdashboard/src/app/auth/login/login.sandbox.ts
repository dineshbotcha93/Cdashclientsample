import { Injectable }         from "@angular/core";
import { Store }              from '@ngrx/store';
import {Sandbox}              from '../../shared/sandbox/base.sandbox';
import * as store             from '../../shared/store';
import * as authActions       from '../../shared/store/actions/auth.action';
import {Router} from "@angular/router";

@Injectable()
export class LoginSandbox extends Sandbox {
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  constructor(protected appState$: Store<store.State>,protected router: Router){
    super(appState$);
  }

  doLogin(form:any){
    console.log(form);
    console.log(form.value.username);
    localStorage.setItem('currentUser',JSON.stringify({'username':form.value.username}));
    this.loginSandbox$.dispatch(new authActions.AuthAction());
    this.router.navigate(['dashboard']);
  }
}
