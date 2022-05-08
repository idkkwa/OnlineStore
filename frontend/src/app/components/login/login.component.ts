import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  submitted = false;


  constructor(private loginService : LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.compareUser()
    this.login()
  }


  login(){
    this.http.get<any>("http://localhost:3000/api/v2/users/")
    .subscribe(data => {
      const user = data.find((a: any) => {
        return a.username === this.model.username && a.password === this.model.password
      });
      if(user){
        alert("Logged In")
      }
    })
}
  compareUser(): void {
    const data = {
       username: this.model.username,
       password:this.model.password,      
    }

    this.loginService.check(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
