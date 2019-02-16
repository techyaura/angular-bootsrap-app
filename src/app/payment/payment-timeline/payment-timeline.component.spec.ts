import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTimelineComponent } from './payment-timeline.component';

describe('PaymentTimelineComponent', () => {
  let component: PaymentTimelineComponent;
  let fixture: ComponentFixture<PaymentTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
