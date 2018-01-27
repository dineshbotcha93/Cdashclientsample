import * as actions from '../actions/alert.action';

export interface State {
  ALERT: boolean;
  SUCCESS: boolean;
  WARNING: boolean;
  data:    Array<any>;
};

const INITIAL_STATE: State = {
  ALERT: false,
  SUCCESS: false,
  WARNING: false,
  data: []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ActionTypes.ALERT: {
      return Object.assign({}, state, {
        ALERT: !state.ALERT
      });
    }
    case actions.ActionTypes.SUCCESS: {
      return Object.assign({}, state, {
        SUCCESS: !state.SUCCESS
      });
    }
    case actions.ActionTypes.WARNING: {
      return Object.assign({}, state, {
        WARNING: !state.WARNING
      });
    }
    default: {
      return state;
    }
  }
};

export const getAlert = (state: State) => state.ALERT;
export const getSuccess = (state: State) => state.SUCCESS;
export const getWarning = (state: State) => state.WARNING;
