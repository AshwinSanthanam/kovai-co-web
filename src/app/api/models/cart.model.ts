import { Product } from "./product.model";

export class Cart {
    productId: number;
    quantity: number;
}

export class CompleteCart {
    cartItems: Cart[];
    totalSum: number;
}

export class CartItem {
    product: Product;
    quantity: number;
}