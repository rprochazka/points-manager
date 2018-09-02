import { Component, OnInit, Input } from '@angular/core';

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

  @Input() pointRecords: IPointRecord[];

}
