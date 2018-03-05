import * as actions from '../actions/alert.action';

export interface State {
  ALERT: boolean;
  SUCCESS: boolean;
  WARNING: boolean;
  data:    Array<any>;
  payload: Array<any>;
};

const INITIAL_STATE: State = {
  ALERT: false,
  SUCCESS: false,
  WARNING: false,
  data: [],
  payload: []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ActionTypes.ALERT: {
      return Object.assign({}, state, {
        ALERT: !state.ALERT,
        payload: action.payload
      });
    }
    case actions.ActionTypes.SUCCESS: {
      return Object.assign({}, state, {
        SUCCESS: !state.SUCCESS,
        payload: action.payload
      });
    }
    case actions.ActionTypes.WARNING: {
      return Object.assign({}, state, {
        WARNING: !state.WARNING,
        payload: action.payload
      });
    }
    default: {
      return state;
    }
  }
};

export const getAlert = (state: State) => {
  return {'type':state.ALERT,'payload':state.payload};
}
export const getSuccess = (state: State) => {
  return {'type':state.SUCCESS,'payload':state.payload};
}
export const getWarning = (state: State) => {
  return {'type':state.WARNING,'payload':state.payload};
}
