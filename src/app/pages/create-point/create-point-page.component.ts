import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsService } from '../../services/points.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-point',
  templateUrl: './create-point-page.component.html',
  styleUrls: ['./create-point-page.component.css']
})
export class CreatePointPageComponent implements OnInit {

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
      owner: [null, Validators.required],
      reason: [null, Validators.required],
      points: [0, Validators.min(1)],
      lastModifiedBy: [null, Validators.required]
    });
  }

}
