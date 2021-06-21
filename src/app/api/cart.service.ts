import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../helpers/storage.service';
import { Cart } from './models/cart.model';
import { GenericResponse } from './models/generic-response.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _baseUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _storageService: StorageService) {
    this._baseUrl = `${environment.apiUrl}/cart`
  }

  public getCart(): Observable<GenericResponse<Product[]>> {
    return this._httpClient.get<GenericResponse<Product[]>>(this._baseUrl, { headers: this.getHeader() });
  }

  public alterQuantity(cart: Cart): Observable<GenericResponse<null>> {
    const url = `${this._baseUrl}/change`;
    return this._httpClient.post<GenericResponse<null>>(url, cart, { headers: this.getHeader() });
  }

  public deleteCartItem(productId: number): Observable<GenericResponse<null>> {
    const url = `${this._baseUrl}/product/${productId}`;
    return this._httpClient.delete<GenericResponse<null>>(url, { headers: this.getHeader() });
  }

  private getHeader() {
    return {
      'Authorization': `Bearer ${this._storageService.token}`
    };
  }
}
