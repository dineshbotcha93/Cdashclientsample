import { Action }   from '@ngrx/store';
import { Tile }  from '../../models';

export const ActionTypes = {
  LOGIN:'LOGIN'
};

export class AuthAction implements Action {
  type = ActionTypes.LOGIN;
  constructor(public payload: any = null){

  }
}

export type Actions
  = AuthAction
