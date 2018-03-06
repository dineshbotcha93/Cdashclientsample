import { Action }   from '@ngrx/store';
import { Toaster }  from '../../models/toastr/toaster.model';

export const ToasterTypes = {
  TOASTER_ALERT:'TOASTER_ALERT',
  TOASTER_SUCCESS: 'TOASTER_SUCCESS',
  TOASTER_WARNING: 'TOASTER_WARNING'
}

export class AlertAction implements Action {
  type = ToasterTypes.TOASTER_ALERT;
  constructor(public payload: any = null){
  }
}

export class SuccessAction implements Action {
  type = ToasterTypes.TOASTER_SUCCESS;
  constructor(public payload: any = null){
  }
}

export class WarningAction implements Action {
  type = ToasterTypes.TOASTER_WARNING;
  constructor(public payload: any = null){
  }
}

export type ToasterActions
  = AlertAction | SuccessAction | WarningAction
