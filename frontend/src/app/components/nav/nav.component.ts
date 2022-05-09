import {Component, OnInit} from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import {HttpClient} from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  public totalItem : number = 0;

  constructor(private http: HttpClient,
    private cartService : CartService) {
  }

  ngOnInit(): void {

    this.cartService.getProduct()
    .subscribe(data =>{
      this.totalItem = data.length;
    })


    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    console.log(this.authenticated)
  }

  logout(): void {
    this.http.post('http://localhost:3000/api/v2/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }

}