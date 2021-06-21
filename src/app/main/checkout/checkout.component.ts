import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { Cart, CartItem, CompleteCart } from 'src/app/api/models/cart.model';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/product.service';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  completeCart: CompleteCart;

  constructor(
    private readonly _cartService: CartService,
    private readonly _spinnerService: SpinnerService) {
      this.completeCart = new CompleteCart();
      this.completeCart.cartItems = [];
    }

  ngOnInit(): void {
    this.loadCart();
  }

  deleteItem(cartItem: CartItem) {
    this._spinnerService.runSpinner();
    const alterCart: Cart = {
      productId: cartItem.product.id,
      quantity: cartItem.quantity * -1
    }
    this._cartService.alterQuantity(alterCart).subscribe(response => {      
      this._spinnerService.stopSpinner();
      this.loadCart();
    });
  }

  alterQuantity(cartItem: CartItem, newQuantity) {
    this._spinnerService.runSpinner();
    const change = newQuantity - cartItem.quantity;
    const cart: Cart = {
      productId: cartItem.product.id,
      quantity: change
    };
    this._cartService.alterQuantity(cart).subscribe(response => {
      this._spinnerService.stopSpinner();
      this.loadCart();
    });
  }

  private loadCart() {
    this._spinnerService.runSpinner();
    this._cartService.getCart().subscribe(response => {
      this.completeCart = response.payload;
      this._spinnerService.stopSpinner();
    });
  }
}
