import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/product.service';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Product[];
  totalSum: number;

  constructor(
    private readonly _cartService: CartService,
    private readonly _spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  deleteItem(product: Product) {
    this._spinnerService.runSpinner();
    this._cartService.deleteCartItem(product.id).subscribe(response => {      
      this._spinnerService.stopSpinner();
      this.loadCart();
    });
  }

  private loadCart() {
    this._spinnerService.runSpinner();
    this._cartService.getCart().subscribe(response => {
      this.products = response.payload;
      this.totalSum = response.payload.map(x => x.price).reduce((a, b) => a + b, 0);
      this._spinnerService.stopSpinner();
    });
  }
}
