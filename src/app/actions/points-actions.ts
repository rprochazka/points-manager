import { PagedItems } from './../domain/point-record';
import { Action } from '@ngrx/store';
import * as models from '../domain';

export const LOAD_POINTS = 'LOAD_POINTS';
export const LOAD_POINTS_SUCCESS = 'LOAD_POINTS_SUCCESS';
export const CHANGE_FILTER = 'CHANGE FILTER';
// export const DELETE_POINT = 'DELETE_POINT';
// export const DELETE_POINT_SUCCESS = 'DELETE_POINT_SUCCESS';
// export const UPDATE_POINT = 'UPDATE_POINT';
// export const UPDATE_POINT_SUCCESS = 'UPDATE_POINT_SUCCESS';
// export const CREATE_POINT = 'CREATE_POINT';
// export const CREATE_POINT_SUCCESS = 'CREATE_POINT_SUCCESS';

export class LoadPointssAction implements Action {
  readonly type = LOAD_POINTS;

  constructor(public payload: models.PointsFilter) {}
}

export class LoadPointsSuccessAction implements Action {
  readonly type = LOAD_POINTS_SUCCESS;

  constructor(public payload: models.PagedItems<models.IPointRecord>) {}
}

export class ChangeFilterAction implements Action {
  readonly type = CHANGE_FILTER;

  constructor(public payload: models.PointsFilter) {}
}

export type Actions =
  | LoadPointssAction
  | LoadPointsSuccessAction
  | ChangeFilterAction;
