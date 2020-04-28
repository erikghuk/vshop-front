import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdAnnonceComponent } from './upd-annonce.component';

describe('UpdAnnonceComponent', () => {
  let component: UpdAnnonceComponent;
  let fixture: ComponentFixture<UpdAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
