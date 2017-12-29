import * as actions from '../actions/tile.action';
import { Tile }  from '../../models';

export interface State {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  data:    Array<Tile>;
};

const INITIAL_STATE: State = {
  loading: false,
  loaded:  false,
  failed:  false,
  data:    []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loaded: true
      });
    }
    default: {
      return state;
    }
  }
};

export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
export const getData = (state: State) => state.data;
