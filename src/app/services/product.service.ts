import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageInfo } from '../models/page-info';
import { Product } from '../models/product';
import { ProductCollection } from '../models/product-collection';
import { ProductApiCollectionResponse } from '../models/product-api-collection-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';  // Url to data
  products: Product[];
  pagingInfo: PageInfo;

  getProducts(page: number, count: number): Observable<ProductApiCollectionResponse> {
    var pageUrl = `${this.productsUrl}?page=${page}&count=${count}`;

    return this.httpClient.get<ProductApiCollectionResponse>(pageUrl);
  }

  getPageInfo(){

  }

  // getProductCollection(page: number, count: number): Observable<ProductCollection> {
  //   return of({
  //               products: paginate(this.products, count, page),
  //               pagingInfo: {
  //                 currentPage: page,
  //                 totalPages: Math.ceil(this.products.length/count)
  //               }
  //             });
  // }
  
  constructor(private httpClient: HttpClient) { }
}

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
