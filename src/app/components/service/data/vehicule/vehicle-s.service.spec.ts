import { TestBed } from '@angular/core/testing';

import { VehicleSService } from './vehicle-s.service';

describe('VehicleSService', () => {
  let service: VehicleSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
