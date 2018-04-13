import * as actions from '../actions/global.action';

export interface State {
  DASHBOARD_LISTVIEW: boolean;
  data:    Array<any>;
  payload: Array<any>;
};

const INITIAL_STATE: State = {
  DASHBOARD_LISTVIEW: false,
  data: [],
  payload: []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) return state;
  switch (action.type) {
    case actions.ActionTypes.DASHBOARD_LISTVIEW: {
      return Object.assign({}, state, {
        DASHBOARD_LISTVIEW: !state.DASHBOARD_LISTVIEW,
        payload: action.payload
      });
    }
  }
}

export const getDashboardListView = (state: State) => {
  return {'type':state.DASHBOARD_LISTVIEW,'payload':state.payload};
}
