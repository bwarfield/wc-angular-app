import { TestBed } from '@angular/core/testing';

import { ProductMemoryDataService } from './product-in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: ProductMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMemoryDataService);
    service.createDb();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
