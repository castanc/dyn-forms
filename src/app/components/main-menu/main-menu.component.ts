import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { BackEndService } from '../../services/backend'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

   constructor( protected bs: BackEndService,
    protected router: Router,
    protected route: ActivatedRoute)
  {
    console.log("mainMenu.constructor())");
  }


  ngOnInit() {
  }
  
    onSelectedItemChanged(formName: string)
  {
    console.log('Form Selected', formName)

    this.bs.Form = this.bs.DA.LoadForm(formName);
    if (this.bs.Form )
    {
      console.log('onSelectedItemChanged, formName', this.bs.Form);
      //this.router.navigate(['Nuevo/Exercise'], {relativeTo: this.route});
      this.router.navigate(['create']);
    }
    else
    {
        throw new Error("Invalid Form")
    }

  }


}
