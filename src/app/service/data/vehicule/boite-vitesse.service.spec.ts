import { TestBed } from '@angular/core/testing';

import { BoiteVitesseService } from './boite-vitesse.service';

describe('BoiteVitesseService', () => {
  let service: BoiteVitesseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoiteVitesseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
