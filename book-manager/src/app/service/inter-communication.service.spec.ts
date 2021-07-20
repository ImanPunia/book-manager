import { TestBed } from '@angular/core/testing';

import { InterCommunicationService } from './inter-communication.service';

describe('InterCommunicationService', () => {
  let service: InterCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
