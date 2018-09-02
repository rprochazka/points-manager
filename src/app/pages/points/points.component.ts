import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsService } from '../../services/points.service';
import { IPointRecord } from '../../domain/point-record';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  pointRecords$: Observable<IPointRecord[]>;

  constructor(private router: Router, private route: ActivatedRoute, private pointsService: PointsService) { }

  ngOnInit() {
    this.pointRecords$ = this.pointsService.getPoints();
  }

  onAddItem(): void {
    this.router.navigate(['./create'], { relativeTo: this.route });
  }

}
