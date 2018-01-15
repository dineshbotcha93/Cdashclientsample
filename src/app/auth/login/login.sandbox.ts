import { Injectable }         from "@angular/core";
import { Store }              from '@ngrx/store';
import {Sandbox}              from '../../shared/sandbox/base.sandbox';
import * as store             from '../../shared/store';
import * as authActions       from '../../shared/store/actions/auth.action';
import {Router} from "@angular/router";
import { CommonSharedService } from '../../shared/services/common-shared.service';


@Injectable()
export class LoginSandbox extends Sandbox {
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  constructor(protected appState$: Store<store.State>,protected router: Router){
    super(appState$);
  }

  doLogin(form:any){
    form.value.password = CommonSharedService.prototype.getHahedPassword(form.value.username,form.value.password);
    localStorage.setItem('currentUser',JSON.stringify({'username':form.value.username}));
    this.loginSandbox$.dispatch(new authActions.AuthAction());
    this.loginSandbox$.subscribe(e=>{
      console.log(e);
    })
    this.router.navigate(['dashboard']);
  }
}
