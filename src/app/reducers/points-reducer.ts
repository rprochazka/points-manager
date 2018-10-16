import * as models from '../domain';
import * as fromPoints from '../actions/points-actions';

export interface State {
  filters: models.PointsFilter;
  pagedItems: models.PagedItems<models.IPointRecord>;
}

const initialState: State = {
  filters: {
    queryOptions: {
      take: 10,
      skipPages: 0,
      orderBy: [
        {
          property: '',
          direction: models.OrderByDirection.Desc
        }
      ]
    }
  },
  pagedItems: []
};

export function reducer(
  state = initialState,
  action: fromPoints.Actions
): State {
  switch (action.type) {
    case fromPoints.LOAD_POINTS_SUCCESS: {
      return {
        ...state,
        filters: state.filters,
        pagedItems: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
