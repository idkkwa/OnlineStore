import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal : number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(data => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(product: any){
    this.cartService.removeCartItem(product);
  }

  emptyCart(){
    this.cartService.removeAllCart();
  }

   myFunction() {
     alert('Thanks for shopping!')
     this.cartService.removeAllCart();
  }

}