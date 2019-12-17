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
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {

  constructor(private bs: BackEndService, router: Router) {
    if ( !bs.Form)
      router.navigate(['']);

   }

   private getField(id:number):Field<any>
   {
     return this.bs.Form.GetField(id);
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if (form.valid)
    {
      this.bs.SaveForm();
    }
    else
    {

    }

  }

}
