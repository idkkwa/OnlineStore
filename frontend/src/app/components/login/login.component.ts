import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) { }

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
    }).subscribe(() => this.router.navigate(['/']))
  }


//   login(){
//     this.http.get<any>("http://localhost:3000/api/v2/users/")
//     .subscribe(data => {
//       const user = data.find((a: any) => {
//         return a.username === this.model.username && a.password === this.model.password
//       });
//       if(user){
//         alert("Logged In")
//       }
//     })
// }
//   compareUser(): void {
//     const data = {
//        username: this.model.username,
//        password:this.model.password,      
//     }

//     this.loginService.check(data)
//       .subscribe(
//         response => {
//           console.log(response);
//           this.submitted = true;
//         },
//         error => {
//           console.log(error);
//         });
//   }
}
