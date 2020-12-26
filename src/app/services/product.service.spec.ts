import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { ProductCollection } from '../models/product-collection';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
