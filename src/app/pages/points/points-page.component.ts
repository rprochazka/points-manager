import { combineLatest, Subject } from 'rxjs';
import {
  startWith,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsService } from '../../services/points.service';
import {
  IPointRecord,
  PointsFilter,
  PagedItems,
  OrderBy,
  OrderByDirection
} from '../../domain/point-record';
import { Observable, BehaviorSubject } from 'rxjs';
import { PointListFilterModel } from '../../components/models';

import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as actions from './../../actions/points-actions';

@Component({
  selector: 'app-points',
  templateUrl: './points-page.component.html',
  styleUrls: ['./points-page.component.css']
})
export class PointsPageComponent implements OnInit {
  pointRecords$: Observable<PagedItems<IPointRecord>>;
  owners$: Observable<string[]>;
  reasons$: Observable<string[]>;

  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  filters$: BehaviorSubject<PointListFilterModel> = new BehaviorSubject<
    PointListFilterModel
  >(new PointListFilterModel());
  sorting$: BehaviorSubject<OrderBy[]> = new BehaviorSubject<OrderBy[]>([
    { property: 'lastModifiedDate', direction: OrderByDirection.Desc }
  ]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pointsService: PointsService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.owners$ = this.pointsService.getOwners();
    this.reasons$ = this.pointsService.getReasons();

    this.pointRecords$ = this.store.select(state => state.points.pagedItems);

    combineLatest(
      this.pageSize$.pipe(
        debounceTime(100),
        distinctUntilChanged()
      ),
      this.pageIndex$.pipe(
        debounceTime(100),
        distinctUntilChanged()
      ),
      this.filters$,
      this.sorting$
    )
      .pipe(
        map(data => ({
          take: data[0],
          skipPages: data[1],
          owner: data[2].owner,
          reason: data[2].reason,
          submitter: data[2].submitter,
          orderBy: data[3]
        })),
        map(data => {
          const pointsFilter = new PointsFilter();
          pointsFilter.queryOptions.take = data.take;
          pointsFilter.queryOptions.skipPages = data.skipPages;
          pointsFilter.owner = data.owner;
          pointsFilter.reason = data.reason;
          pointsFilter.submitter = data.submitter;
          pointsFilter.queryOptions.orderBy = data.orderBy;
          return pointsFilter;
        }),
        debounceTime(0),
        tap(
          // filter => this.pointsService.getPoints(filter)
          filter => this.store.dispatch(new actions.ChangeFilterAction(filter))
        )
      )
      .subscribe();
  }

  onAddItem(): void {
    this.router.navigate(['./create'], { relativeTo: this.route });
  }
}
