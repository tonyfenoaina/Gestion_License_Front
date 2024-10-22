import { TestBed } from '@angular/core/testing';

import { ObjectlistService } from './objectlist.service';

describe('ObjectlistService', () => {
  let service: ObjectlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
