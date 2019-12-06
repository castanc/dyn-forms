import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { BackEndService } from '../../services/backend'


@Component({
  selector: 'app-generic-component',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {

  
  constructor( protected bs: BackEndService,
    protected router: Router,
    protected route: ActivatedRoute)
  {
    console.log("genericCOmponent.constructor())");
  }


  ngOnInit() {
  }

}
