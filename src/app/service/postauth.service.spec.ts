import { TestBed } from '@angular/core/testing';

import { PostauthService } from './postauth.service';

describe('PostauthService', () => {
  let service: PostauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
