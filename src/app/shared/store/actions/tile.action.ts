import { Action }   from '@ngrx/store';
import { Tile }  from '../../models';

export const ActionTypes = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  DELETE: 'DELETE'
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any = null){

  }
}

export type Actions
  = LoadAction
