import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/v2/cookie', {withCredentials: true}).subscribe(
     (res: any) => {
        this.message = 'Hey';
        Emitters.authEmitter.emit(true);
      },
      error => {
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);
      }
    );
  }

}