import { combineLatest } from 'rxjs';
import { startWith, switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsService } from '../../services/points.service';
import { IPointRecord, PointsFilter, PagedItems } from '../../domain/point-record';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  pointRecords$: Observable<PagedItems<IPointRecord>>;

  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private router: Router, private route: ActivatedRoute, private pointsService: PointsService) { }

  ngOnInit() {

    this.pointRecords$ = combineLatest(
      this.pageSize$.pipe(debounceTime(100), distinctUntilChanged()),
      this.pageIndex$.pipe(debounceTime(100), distinctUntilChanged())
    )
      .pipe(
        map(data => {
          const pointsFilter = new PointsFilter();
          pointsFilter.queryOptions.take = data[0];
          pointsFilter.queryOptions.skipPages = data[1];
          return pointsFilter;
        }),
        debounceTime(0),
        switchMap(filter => this.pointsService.getPoints(filter))
      );
  }

  onAddItem(): void {
    this.router.navigate(['./create'], { relativeTo: this.route });
  }

}
