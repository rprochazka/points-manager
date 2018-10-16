import { PointsService } from './../services/points.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from './../actions/points-actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class PointsEffects {
  constructor(
    private actions$: Actions,
    private pointsService: PointsService
  ) {}

  @Effect()
  loadPoints$ = this.actions$
    .ofType(actions.CHANGE_FILTER, actions.LOAD_POINTS)
    .pipe(
      switchMap((action: actions.ChangeFilterAction) => {
        return this.pointsService
          .getPoints(action.payload)
          .pipe(map(points => new actions.LoadPointsSuccessAction(points)));
      })
    );
}
