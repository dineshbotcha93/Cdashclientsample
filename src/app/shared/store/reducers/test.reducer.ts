import * as actions from '../actions/tile.action';

export interface State {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  data:    string;
};

const INITIAL_STATE: State = {
  loading: false,
  loaded:  false,
  failed:  false,
  data:    "a"
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;

  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }
    default: {
      return state;
    }
  }
};

export const getData    = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
