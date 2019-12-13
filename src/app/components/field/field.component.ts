import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../models/field'
import { FieldUI } from '../../models/fieldui'
import { BackEndService } from '../../services/backend'
import { Router } from '@angular/router';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() f: Field<any>
  @Input() fUI: FieldUI;

  constructor(private bs: BackEndService, router: Router) {
  }

  ngOnInit() {
    if ( !this.f)
      this.f = this.bs.Form.GetField(this.fUI.IdField);

      console.log("field:",this.f);
  }

}
