import { Action }   from '@ngrx/store';

export const ActionTypes = {
  DASHBOARD_LISTVIEW:'DASHBOARD_LISTVIEW'
};

export class DashboardListViewAction implements Action {
  type = ActionTypes.DASHBOARD_LISTVIEW;
  constructor(public payload: any = null){
  }
}

export type Actions = DashboardListViewAction
