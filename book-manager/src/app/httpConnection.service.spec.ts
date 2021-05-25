import { TestBed } from '@angular/core/testing';

import { httpConnectionService } from './httpConnection.service';

describe('HttpConnectionService', () => {
  let service: httpConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(httpConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
