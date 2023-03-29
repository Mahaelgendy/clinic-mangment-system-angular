import { TestBed } from '@angular/core/testing';

import { AuthIntercepentorService } from './auth-intercepentor.service';

describe('AuthIntercepentorService', () => {
  let service: AuthIntercepentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthIntercepentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
