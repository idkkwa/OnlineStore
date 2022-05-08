import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public totalItem : number = 0;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.getProduct()
    .subscribe(data =>{
      this.totalItem = data.length;
    })

  }
  title = 'frontend';
}
