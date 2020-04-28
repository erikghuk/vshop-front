import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionImageComponent } from './reception-image.component';

describe('ReceptionImageComponent', () => {
  let component: ReceptionImageComponent;
  let fixture: ComponentFixture<ReceptionImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
