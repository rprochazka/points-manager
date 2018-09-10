import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagedItems, OrderBy, OrderByDirection } from '../../domain/point-record';

interface IPointRecord {
  owner: string;
  reason: string;
  points: number;
}

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent {

  @Input() pointRecords: PagedItems<IPointRecord>;
  @Input() isLoading = false;

  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() sortChanged: EventEmitter<OrderBy[]> = new EventEmitter<OrderBy[]>();

  onSortChanged(event: { sorts: Array<{ dir: string, prop: string }> }): void {
    console.log(event);
    const orderBy = event.sorts.map((s) => {
      const o = new OrderBy();
      o.direction = s.dir === 'asc' ? OrderByDirection.Asc : OrderByDirection.Desc;
      o.property = s.prop;
      return o;
    });
    this.sortChanged.emit(orderBy);
  }


}
