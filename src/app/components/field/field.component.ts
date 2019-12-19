import { Component, OnInit, Input } from '@angular/core';

import { Field } from '../../models/field'
import { FieldUI } from '../../models/fieldui'
import { BackEndService } from '../../services/backend'
import { Router } from '@angular/router';
import { DTOField } from 'src/app/models/DTOField';


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() f: Field<any>
  @Input() fUI: FieldUI;
  @Input() DTOField: DTOField<any>;


  constructor(private bs: BackEndService, router: Router) {
  }

  ngOnInit() {

    //todo: this is not required but if removed binding stops working
    if ( !this.f)
      this.f = this.bs.Form.GetField(this.fUI.IdField);
    if ( !this.DTOField)
      this.DTOField = this.bs.Form.DTOFields[this.f.Id];

      //console.log("field:",this.f);
      //console.log("DTOField:",this.DTOField);
  }

  getImage(imageFieldId:number):string {
    //gets image or url from image list repository
    return "";
  }

  onSelectedItemChanged(){

  }

  onChange()
  {

  }

  addImageUrl()
  {

    /*
    if ( this.DTOField.Value && this.DTOField.Value != "" &&  this.fUI.HtmlInputType.toLowerCase()=="url") 
    {
      //TODO: NEITHER WAY THE IMAGE IS REFRESHED
        this.bs.Form.Fields[this.fUI.ImageFieldId].Value = this.bs.AddImageList(this.DTOField.Value);
        console.log("url saved:",this.bs.ImageList.length);
        //this.fUI.ImageSource = this.DTOField.Value;
        this.DTOField.Value = "";
      }
      */
  }

  onFocusOut()
  {
    this.bs.FieldOnExit(this.fUI.Id);
  }

}
