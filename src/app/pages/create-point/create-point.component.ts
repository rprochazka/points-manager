import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsService } from '../../services/points.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-point',
  templateUrl: './create-point.component.html',
  styleUrls: ['./create-point.component.css']
})
export class CreatePointComponent implements OnInit {

  form: FormGroup;

  owners$: Observable<string[]>;
  reasons$: Observable<string[]>;

  constructor(private router: Router, private route: ActivatedRoute, private pointsService: PointsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.owners$ = this.pointsService.getOwners();
    this.reasons$ = this.pointsService.getReasons();
  }

  onSubmit(): void {
    this.pointsService.addPoint(this.form.value)
      .subscribe(
        () => this.router.navigate(['..'], { relativeTo: this.route }),
        (error) => console.error(error)
      );
  }

  onCancel(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private initForm(): void {
    this.form = this.fb.group({
      owner: [''],
      reason: [''],
      points: [0]
    });
  }

}
