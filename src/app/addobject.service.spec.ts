import { TestBed } from '@angular/core/testing';

import { GetobjectService } from './postobject.service';

describe('AddobjectService', () => {
  let service: GetobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
