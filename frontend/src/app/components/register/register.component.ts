
import { Login } from 'models/login.model';

import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  submitted = false;
  constructor(    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private api: LoginService,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit(): void{
    this.api.create(this.form.value).subscribe(() => this.router.navigate(['/login']))
  }

  registerFormControl = new FormControl('', [Validators.required, Validators.email]);
  
}
