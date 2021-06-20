import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../helpers/storage.service';
import { GenericResponse } from './models/generic-response.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _baseUrl: string;
  private readonly _header;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _storageService: StorageService) {
    this._baseUrl = `${environment.apiUrl}/product`;
  }

  public getProducts(pageSize: number, offset: number, productName: string): Observable<GenericResponse<Product[]>> {
    const url = `${this._baseUrl}?pageSize=${pageSize}&offset=${offset}&productName=${productName}`;
    return this._httpClient.get<GenericResponse<Product[]>>(url, { headers: this.getHeader() })
  }

  public createOrUpdateProduct(product: Product): Observable<GenericResponse<Product>> {
    return this._httpClient.post<GenericResponse<Product>>(this._baseUrl, product, { headers: this.getHeader() });
  }

  public deleteProduct(id: number) : Observable<GenericResponse<null>> {
    const url = `${this._baseUrl}/${id}`;
    return this._httpClient.delete<GenericResponse<null>>(url, { headers: this.getHeader() })
  }

  private getHeader() {
    return {
      'Authorization': `Bearer ${this._storageService.token}`
    };
  }
}
