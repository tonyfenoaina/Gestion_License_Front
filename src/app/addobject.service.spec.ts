import { TestBed } from '@angular/core/testing';

import { PostobjectService } from './service/postobject.service';

describe('AddobjectService', () => {
  let service: PostobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
