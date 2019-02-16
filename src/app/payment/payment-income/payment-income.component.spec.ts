import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentIncomeComponent } from './payment-income.component';

describe('PaymentIncomeComponent', () => {
  let component: PaymentIncomeComponent;
  let fixture: ComponentFixture<PaymentIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
