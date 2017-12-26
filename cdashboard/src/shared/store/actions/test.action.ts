import { Action }   from '@ngrx/store';

export const ActionTypes = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  DELETE: 'DELETE'
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;
  constructor(public payload: any = null){

  }
}

export type Actions
  = LoadAction
