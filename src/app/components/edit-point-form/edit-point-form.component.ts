import { Component, OnInit, Input } from '@angular/core';
import { IPointRecord } from '../../domain/point-record';
import { FormGroup } from '@angular/forms';
import { IKeyValuePair } from '../../domain/key-value-pair';

@Component({
  selector: 'app-edit-point-form',
  templateUrl: './edit-point-form.component.html',
  styleUrls: ['./edit-point-form.component.css']
})
export class EditPointFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() owners: IKeyValuePair[];
  @Input() reasons: IKeyValuePair[];

  constructor() { }

  ngOnInit() {
  }

}
