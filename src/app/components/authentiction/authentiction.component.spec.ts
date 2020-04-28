import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentictionComponent } from './authentiction.component';

describe('AuthentictionComponent', () => {
  let component: AuthentictionComponent;
  let fixture: ComponentFixture<AuthentictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
