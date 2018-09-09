import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagedItems } from '../../domain/point-record';
import { PagingDataModel } from '../paging/paging-data.model';

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

  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter<number>();

}
