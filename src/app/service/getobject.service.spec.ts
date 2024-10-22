import { TestBed } from '@angular/core/testing';

import { GetobjectService } from './getobject.service';

describe('GetobjectService', () => {
  let service: GetobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
