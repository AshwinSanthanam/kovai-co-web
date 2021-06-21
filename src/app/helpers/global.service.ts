import { Injectable } from '@angular/core';
import { Publisher } from './publisher';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private readonly _cartItemCommand: Publisher<number>;

  constructor() {
    this._cartItemCommand = new Publisher<number>();
  }

  public get cartItemCommand(): Publisher<number> {
    return this._cartItemCommand;
  }
}
