import { createSelector,createFeatureSelector} from '@ngrx/store';

/**
 * More info: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { ActionReducer, combineReducers } from '@ngrx/store';
/**
 * More info: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromTiles        from './reducers/tiles.reducer';
import * as fromTest         from './reducers/test.reducer';
import * as fromAuth         from './reducers/auth.reducer';
import * as fromAlerts       from './reducers/alert.reducer';
import * as fromToaster      from './reducers/toaster.reducer';
import * as fromGlobal       from './reducers/global.reducer';
/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  global:{
    tiles:       fromTiles.State;
    tests:       fromTest.State;
    auth:        fromAuth.State;
    alerts:      fromAlerts.State;
    toaster:     fromToaster.State;
    global:      fromGlobal.State;
  },
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  tiles:       fromTiles.reducer,
  tests:       fromTest.reducer,
  auth:        fromAuth.reducer,
  alerts:      fromAlerts.reducer,
  toaster:     fromToaster.reducer,
  global:      fromGlobal.reducer
};

export function store(state: any, action: any) {
  const store = compose(combineReducers)(reducers);
  return store(state, action);
}

/**
 * Products store functions
 */
export const getTilesState   = (state: State) => state.global.tiles;
export const getTilesLoaded  = createSelector(getTilesState, fromTiles.getLoaded);
export const getTilesLoading = createSelector(getTilesState, fromTiles.getLoading);
export const getTilesFailed  = createSelector(getTilesState, fromTiles.getFailed);
export const getTilesData    = createSelector(getTilesState, fromTiles.getData);
export const getAuthState    = (state: State) => state.global.auth;
export const getLoggedIn     = createSelector(getAuthState, fromAuth.getLogin);
export const getAlertState   = (state: State) => state.global.alerts;
export const getShowAlert    = createSelector(getAlertState, fromAlerts.getAlert);
export const getShowSuccess  = createSelector(getAlertState, fromAlerts.getSuccess);
export const getShowWarning  = createSelector(getAlertState, fromAlerts.getWarning);
export const getToasterState = (state: State) => state.global.toaster;
export const getToasterSuccess = createSelector(getToasterState, fromToaster.getSuccess);
export const getGlobalState = (state:State) => state.global.global;
export const getListView = createSelector(getGlobalState, fromGlobal.getListView);
