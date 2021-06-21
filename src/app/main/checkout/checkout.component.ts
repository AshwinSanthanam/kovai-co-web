import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Product[];

  constructor(
    private readonly _cartService: CartService,
    private readonly _productService: ProductService) { }

  ngOnInit(): void {
    this._cartService.getCart().subscribe(response => {
      this.products = response.payload;
    });
  }

}
