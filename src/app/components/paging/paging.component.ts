import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-paging',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'paging.component.html',
  styleUrls: ['paging.component.css']
})

export class PagingComponent {

  @Input() totalItemsCount: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() pageSizeLimits: number[] = [5, 10, 20, 50];

  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageSizeChanged(pageSize: number) {
    console.log('onPageSizeChanged', pageSize);
    this.pageSizeChanged.emit(pageSize);
  }

  onPageIndexChanged(pageIndex: number) {
    console.log('onPageIndexChanged', pageIndex);
    this.pageIndexChanged.emit(pageIndex);
  }
}
