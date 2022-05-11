import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitters';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  submitted = false;
  form: FormGroup;


  constructor(
    private loginService : LoginService, 
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
   
    ) { }

  ngOnInit(): void {
    // this.compareUser()
    // this.login()

    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void{
    this.http.post("http://localhost:3000/api/v2/login", this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/home']))
  }

  checkAdmin() {

  }

    userFormControl = new FormControl('', [Validators.required, Validators.email]);

}

export class InputErrorsExample {
}