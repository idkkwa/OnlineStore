import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(private productService: ProductService, private cartService: CartService) { }

  products?: Product[];

  ngOnInit(): void {
    this.retrieveProducts()
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);

          this.products.forEach((a:any) => {
            Object.assign(a, {quantity: 1, total: a.price})
          })
        },
        error => {
          console.log(error);
        });
  }

  addToCart(product: any){
    this.cartService.addToCart(product)
  }
}
