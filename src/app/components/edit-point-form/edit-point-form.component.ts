import { Component, OnInit, Input } from "@angular/core";
import { IPointRecord } from "../../domain/point-record";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-edit-point-form",
  templateUrl: "./edit-point-form.component.html",
  styleUrls: ["./edit-point-form.component.css"]
})
export class EditPointFormComponent implements OnInit {
  @Input()
  form: FormGroup;
  @Input()
  owners: string[];
  @Input()
  reasons: string[];
  @Input()
  submitters: string[];

  constructor() {}

  ngOnInit() {}
}
