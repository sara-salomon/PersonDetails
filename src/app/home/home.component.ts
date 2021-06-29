import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {User} from '../user'
import { UserFunctionService } from '../user-function.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
p:string="  sari";
Users:User[]=[];
@Input() user:any;
  constructor(private userFunction:UserFunctionService) { }

  ngOnInit(): void {
    this.getUsers();
// alert(this.Users[1]);
  }
  getUsers() {
    this.userFunction.getUsers().subscribe((users)=>{this.Users=users});
  }

}
