import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductApiCollectionResponse } from '../models/product-api-collection-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';  // Url to data

  getProducts(page: number, count: number): Observable<ProductApiCollectionResponse> {
    var pageUrl = `${this.productsUrl}?page=${page}&count=${count}`;

    return this.httpClient.get<ProductApiCollectionResponse>(pageUrl);
  }
  
  constructor(private httpClient: HttpClient) { }
}
