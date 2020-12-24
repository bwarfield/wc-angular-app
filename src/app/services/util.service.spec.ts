import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new UtilService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
