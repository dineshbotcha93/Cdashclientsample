import * as actions from '../actions/auth.action';

export interface State {
  login: boolean;
  data:    Array<any>;
};

const INITIAL_STATE: State = {
  login: false,
  data:    []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ActionTypes.LOGIN: {
      return Object.assign({}, state, {
        login: true
      });
    }
    default: {
      return state;
    }
  }
};

export const getLogin = (state: State) => state.login;
