import { Injectable, ViewContainerRef }         from "@angular/core";
import { Store }              from '@ngrx/store';
import { Sandbox }              from '../../shared/sandbox/base.sandbox';
import { Router } from "@angular/router";
import { CommonSharedService } from '../../shared/services/common-shared.service';
import { RequesterService } from '../../shared/services/requester.service';
import * as store             from '../../shared/store';
import * as authActions       from '../../shared/store/actions/auth.action';
import * as toasterActions    from '../../shared/store/actions/toaster.action';
import * as moment from 'moment/moment';

@Injectable()
export class LoginSandbox extends Sandbox {
  private loginSandbox$ =  this.appState$.select(store.getLoggedIn);
  private toasterSandbox$ = this.appState$.select(store.getToasterState);
  constructor(
    protected appState$: Store<store.State>,
    protected router: Router,
    private commonSharedService: CommonSharedService,
    private requesterService: RequesterService
  ){
    super(appState$);
  }

  doLogin(form:any){
    //form.value.password = this.commonSharedService.getHahedPassword(form.value.username,form.value.password);
    localStorage.setItem('currentUser',JSON.stringify({'username':form.value.username}));

    this.loginSandbox$.dispatch(new authActions.AuthAction());
    this.loginSandbox$.subscribe(e=>{
      console.log(e);
    });
    let body = {
      Username:form.value.username,
      Password:form.value.password
    };
    this.requesterService
    .postExternalRequest('/api/Token',body)
    .then((e)=>{
      localStorage.setItem('com.cdashboard.token', e);
      this.requesterService.getExternalRequest('/api/User/Info').then((res)=>{
        if(res.admin){
          this.router.navigate(['business']);
        } else {
          const isPrimaryContact = (res.userName === res.account[0].userName);
          const expiryDate = moment(res.account[0].subscriptionExpiry);
          const todaysDate = moment();
          let dateDifference = expiryDate.diff(todaysDate,'days');
          if(dateDifference >= 30){
            //this.toasterSandbox$.dispatch(new toasterActions.SuccessAction('test'));
            this.router.navigate(['dashboard']);
          } else if(dateDifference > 0 && dateDifference < 30) {
            if(isPrimaryContact){
              this.toasterSandbox$.dispatch(new toasterActions.AlertAction(`Your subscription will expire in ${dateDifference} days, click here to Renew`))
            } else {
              this.toasterSandbox$.dispatch(new toasterActions.AlertAction(`Your subscription will expire in ${dateDifference} days, contact Account Administrators to Renew it now.`));
            }
            this.router.navigate(['dashboard']);
          } else if(dateDifference < 0) {
            if(isPrimaryContact){
              this.toasterSandbox$.dispatch(new toasterActions.AlertAction(`Your subscription is expired on ${expiryDate.format('DD/MM/YYYY')}, click here to Renew`))
            } else {
              this.toasterSandbox$.dispatch(new toasterActions.AlertAction(`Your subscription is expired on ${expiryDate.format('DD/MM/YYYY')}, contact Account Administrators to Renew it now.`));
            }
            this.router.navigate(['user-profile']);
          }
        }
      });
    });
  }
}
