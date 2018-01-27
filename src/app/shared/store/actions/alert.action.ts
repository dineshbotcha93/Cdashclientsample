import { Action }   from '@ngrx/store';
import { Alert }  from '../../models/alert.model';

export const ActionTypes = {
  ALERT:'ALERT',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING'
};

export class AlertAction implements Action {
  type = ActionTypes.ALERT;
  constructor(public payload: any = null){
  }
}

export class SuccessAction implements Action {
  type = ActionTypes.SUCCESS;
  constructor(public payload: any = null){
  }
}

export class WarningAction implements Action {
  type = ActionTypes.WARNING;
  constructor(public payload: any = null){
  }
}

export type Actions
  = AlertAction | SuccessAction | WarningAction
