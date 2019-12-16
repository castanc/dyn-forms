import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Field } from '../../models/field'
import { FieldUI } from '../../models/fieldui'
import { Form } from '../../models/form'
import { ListItem } from '../../models/list-item'
import { ComboItem } from '../../models/combo-item'
import { BackEndService } from '../../services/backend'
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-with-related',
  templateUrl: './generic-with-related.component.html',
  styleUrls: ['./generic-with-related.component.css']
})
export class GenericWithRelatedComponent implements OnInit {
  f: Form;

  constructor(private bs: BackEndService, router: Router) {
    if ( bs.Form)
    {
      this.f = bs.Form;
    }
    else
      router.navigate(['']);
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if (form.valid)
    {
      this.bs.SaveForm(this.f);
    }
    else
    {

    }

  }

}
