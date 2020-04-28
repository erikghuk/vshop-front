import { TestBed } from '@angular/core/testing';

import { AddAnnonceService } from './add-annonce.service';

describe('AddAnnonceService', () => {
  let service: AddAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
