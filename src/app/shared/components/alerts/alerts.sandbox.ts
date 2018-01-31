import { Injectable }         from "@angular/core";
import { Store }              from '@ngrx/store';
import {Sandbox}              from '../../../shared/sandbox/base.sandbox';
import * as store             from '../../../shared/store';
import * as alertActions       from '../../../shared/store/actions/alert.action';

@Injectable()
export class AlertSandbox extends Sandbox{
  private alertSandbox$ =  this.appState$.select(store.getShowAlert);
  private successSandbox$ = this.appState$.select(store.getShowSuccess);
  private warningSandbox$ = this.appState$.select(store.getShowWarning);

  constructor(protected appState$: Store<store.State>){
    super(appState$);
  }

  showAlert(content = null){
    this.alertSandbox$.dispatch(new alertActions.AlertAction(content));
  }

  getAlert(){
    return this.alertSandbox$;
  }

  getSuccess(){
    return this.successSandbox$;
  }

  getWarning(){
    return this.warningSandbox$;
  }

  showSuccess(){
    this.successSandbox$.dispatch(new alertActions.SuccessAction());
  }

  showWarning(){
    this.warningSandbox$.dispatch(new alertActions.WarningAction());
  }
}
