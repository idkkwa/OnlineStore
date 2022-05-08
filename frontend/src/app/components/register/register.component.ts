import { Component, OnInit } from '@angular/core';
import { Login } from 'models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login: Login = {
    username: '',
    password: '',
  };

  submitted = false;
  constructor(private loginService: LoginService) { }
  ngOnInit(): void {}

  saveUser(): void {
    const data = {
      username: this.login.username,
      password: this.login.password,
    };

    this.loginService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

    newUser(): void {
      this.submitted = false;
      this.login = {
        username: '',
        password: '',
      };
    }
}
