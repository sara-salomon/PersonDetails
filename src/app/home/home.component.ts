import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../user'
import { UserFunctionService } from '../user-function.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(public userFunction: UserFunctionService) { }

  ngOnInit(): void {
  }

}
