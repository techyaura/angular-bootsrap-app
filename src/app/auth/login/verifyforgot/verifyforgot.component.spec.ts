import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyforgotComponent } from './verifyforgot.component';

describe('VerifyforgotComponent', () => {
  let component: VerifyforgotComponent;
  let fixture: ComponentFixture<VerifyforgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyforgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
