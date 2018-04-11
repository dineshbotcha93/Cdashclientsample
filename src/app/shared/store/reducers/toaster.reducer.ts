import * as actions from '../actions/toaster.action';

export interface State {
  TOASTER_ALERT: boolean;
  TOASTER_SUCCESS: boolean;
  TOASTER_WARNING: boolean;
  data:    Array<any>;
  payload: string;
};

const INITIAL_STATE: State = {
  TOASTER_ALERT: false,
  TOASTER_SUCCESS: false,
  TOASTER_WARNING: false,
  data: [],
  payload: '',
};

export function reducer(state = INITIAL_STATE, action: actions.ToasterActions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ToasterTypes.TOASTER_ALERT: {
      return Object.assign({}, state, {
        TOASTER_ALERT: !state.TOASTER_ALERT,
        payload: action.payload,
        data: action.data
      });
    }
    case actions.ToasterTypes.TOASTER_SUCCESS: {
      return Object.assign({}, state, {
        TOASTER_SUCCESS: !state.TOASTER_SUCCESS,
        payload: action.payload,
        data: action.data
      });
    }
    case actions.ToasterTypes.TOASTER_WARNING: {
      return Object.assign({}, state, {
        TOASTER_WARNING: !state.TOASTER_WARNING,
        payload: action.payload,
        data: action.data
      });
    }
    default: {
      return state;
    }
  }
};

export const getAlert = (state: State) => {
  return {type:state.TOASTER_ALERT,payload:state.payload,data:state.data};
}
export const getSuccess = (state: State) => {
  return {type:state.TOASTER_SUCCESS,payload:state.payload,data:state.data};
}
export const getWarning = (state: State) => {
  return {type:state.TOASTER_WARNING,payload:state.payload,data:state.data};
}
