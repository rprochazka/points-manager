import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PointsService } from "../../services/points.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { mergeMap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-edit-point",
  templateUrl: "./edit-point-page.component.html",
  styleUrls: ["./edit-point-page.component.css"]
})
export class EditPointPageComponent implements OnInit {
  form: FormGroup;

  owners$: Observable<string[]>;
  reasons$: Observable<string[]>;
  submitters$: Observable<string[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pointsService: PointsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.owners$ = this.pointsService.getOwners();
    this.reasons$ = this.pointsService.getReasons();
    this.submitters$ = this.pointsService.getSubmitters();

    this.route.params
      .pipe(switchMap(p => this.pointsService.getPoint(p.pointId)))
      .subscribe(p => this.form.patchValue(p));
  }

  onSubmit(): void {
    this.pointsService
      .editPoint(this.form.value)
      .subscribe(
        () => this.router.navigate(["../.."], { relativeTo: this.route }),
        error => console.error(error)
      );
  }

  onCancel(): void {
    this.router.navigate(["../.."], { relativeTo: this.route });
  }

  private initForm(): void {
    this.form = this.fb.group({
      owner: [null, Validators.required],
      reason: [null, Validators.required],
      note: [null],
      points: [0, Validators.min(1)],
      submitter: [null, Validators.required]
    });
  }
}
