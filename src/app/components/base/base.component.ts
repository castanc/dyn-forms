import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

import { BackEndService } from '../../services/backend'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
@ViewChild('cDate', {static:false}) cDate: ElementRef 
@ViewChild('cTime', {static:false}) cTime: ElementRef 
@ViewChild('f2', {static:false}) form: ElementRef 


  constructor( protected bs: BackEndService,
    protected router: Router,
    protected route: ActivatedRoute)
  {
    console.log("baseComponent.constructor())");
  }


  ngOnInit() {
  }

  onSelectedItemChanged(formName: string)
  {
    this.bs.SetUserDate(this.cDate.nativeElement.value,this.cTime.nativeElement.value);
    this.bs.LoadForm();
    if (this.bs.Form )
    {
      this.router.navigate(['create']);
    }
    else
    {
        throw new Error("Invalid Form")
    }

  }

  createInfrastructureItem(id:number){
    this.bs.SetUserDate(this.cDate.nativeElement.value,this.cTime.nativeElement.value);
    this.bs.FormId = id;
    this.bs.LoadInfrastructureForm();
    if (this.bs.Form )
    {
      this.router.navigate(['create']);
    }
    else
    {
        throw new Error("Invalid Form")
    }

  }

  onSubmit(form: NgForm){
  }


}
