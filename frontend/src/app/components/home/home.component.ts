import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from 'models/login.model';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "";
  users: Login[];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/v2/cookie', {withCredentials: true}).subscribe(
     (res: any) => {
       this.users = res;
       console.log(res);
        //this.message = "You are logged in ", res;
        Emitters.authEmitter.emit(true);
      },
      error => {
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);
        console.log(error)
      }
    );
  }

}