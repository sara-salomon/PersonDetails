import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user'
import { Child } from '../Child'
import { HMO } from '../hmo'
import { UserFunctionService } from '../user-function.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }]
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  ishome: boolean = false;
  newUser: User = new User;
  hmos: HMO[] = [
    { value: 'meuchedet', viewValue: 'meuchedet' },
    { value: 'leumit', viewValue: 'leumit' },
    { value: 'makabi', viewValue: 'makabi' },
    { value: 'clalit', viewValue: 'clalit' }
  ];
  serializedDate = new FormControl((new Date()).toISOString());
  IsAdd: boolean = false;
  public parent: any;
  childrenForm: any;
  childrenFormParent: any;

  constructor(private formBuilder: FormBuilder, private userFunction: UserFunctionService) { }
  ngOnInit(): void {
    this.builderformBuilder();
    this.userForm.controls['firstName'].setValue(this.userFunction.currentUserFirstName);
    this.userForm.controls['lastName'].setValue(this.userFunction.currentUserLastName);
    this.userForm.controls['bornDate'].setValue(this.userFunction.currentUserbornDate);
    this.userForm.controls['id'].setValue(this.userFunction.currentUserid);
    this.userForm.controls['gender'].setValue(this.userFunction.currentUsergender);
    this.userForm.controls['hMO'].setValue(this.userFunction.currentUserhMO);
  }
  OnDestroy(): void {
    this.newUser = this.userForm.getRawValue();
  }
  builderformBuilder() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      bornDate: ['', [Validators.required]],
      id: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      gender: ['', [Validators.required]],
      hMO: ['', [Validators.required]],
      children: this.formBuilder.array([
      ])
    });
  }

  get children(): FormArray {
    debugger
    return this.userForm.get('children') as FormArray;
  }
  addChild() {
    let child = new Child();
    let fg = this.formBuilder.group(child);
    this.children.push(fg);
  }
  getErrorMessagefirstName() {
    if (this.userForm.get('firstName').hasError('required')) {
      return 'This is a required field';
    }
    return this.userForm.get('firstName').hasError('pattern') ? 'Not a valid firstName' : '';
  }

  getErrorMessageLastName() {
    if (this.userForm.get('lastName').hasError('required')) {
      return 'This is a required field';
    }
    return this.userForm.get('lastName').hasError('pattern') ? 'Not a valid lastName' : '';
  }

  getErrorMessage() {
    if (this.userForm.get('id').hasError('required')) {
      return 'This is a required field';
    }
    return this.userForm.get('id').hasError('pattern') ? 'Not a valid tz' : '';
  }

  onSubmit() {
    this.newUser = this.userForm.getRawValue();
    this.userFunction.addUser(this.newUser).subscribe(() => { });
  }

  getErrorMessageTz(i: number) {
    if (this.userForm.get('children').hasError('required')) {
      return 'This is a required field';
    }
    return this.userForm.get('children').hasError('pattern') ? 'Not a valid tz' : '';
  }
  changeName() {
    this.userFunction.currentUser = `${this.userForm.get('firstName').value} ${this.userForm.get('lastName').value}`;
    this.userFunction.currentUserFirstName = this.userForm.get('firstName').value;
    this.userFunction.currentUserLastName = this.userForm.get('lastName').value;
    this.userFunction.currentUserbornDate = this.userForm.get('bornDate').value;
    this.userFunction.currentUserid = this.userForm.get('id').value;
    this.userFunction.currentUsergender = this.userForm.get('gender').value;
    this.userFunction.currentUserhMO = this.userForm.get('hMO').value;
  }
}
