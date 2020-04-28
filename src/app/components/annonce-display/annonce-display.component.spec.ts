import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceDisplayComponent } from './annonce-display.component';

describe('AnnonceDisplayComponent', () => {
  let component: AnnonceDisplayComponent;
  let fixture: ComponentFixture<AnnonceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
