export class Cart {
    productId: number;
    quantity: number;
}

export class CompleteCart {
    cartItems: Cart[];
    totalSum: number;
}