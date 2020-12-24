import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductCollection } from '../models/product-collection';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductCollection(page: number, count: number): Observable<ProductCollection> {
    return of({
                products: paginate(this.products, count, page),
                pagingInfo: {
                  currentPage: page,
                  totalPages: Math.ceil(this.products.length/count)
                }
              });
  }
  
  products: Product[] = [
    {
      name: 'Starter',
      price: 1.00,
      description: 'Starter features for your business to grow.'
    },
    {
      name: 'Regular',
      price: 25.00,
      description: 'Regular features for your business to grow.'
    },
    {
      name: 'Professional',
      price: 75.00,
      description: 'Professional features for your business to grow.'
    },
    {
      name: 'Ultimate',
      price: 115.00,
      description: 'The ultimate set of features for your business to grow.'
    },
  ];

  constructor() { }
}

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
