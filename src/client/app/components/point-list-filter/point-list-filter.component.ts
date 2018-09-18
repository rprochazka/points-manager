import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PointListFilterModel } from "../models";

@Component({
  selector: "app-point-list-filter",
  templateUrl: "./point-list-filter.component.html"
})
export class PointListFilterComponent implements OnInit {
  @Input()
  owners: string[];
  @Input()
  reasons: string[];

  @Output()
  filterChanged: EventEmitter<PointListFilterModel> = new EventEmitter<
    PointListFilterModel
  >();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.form.valueChanges.subscribe((changes: PointListFilterModel) => {
      this.filterChanged.emit(changes);
    });
  }

  private initForm(): FormGroup {
    const form = this.fb.group({
      owner: "",
      reason: "",
      submitter: ""
    } as PointListFilterModel);
    return form;
  }
}
