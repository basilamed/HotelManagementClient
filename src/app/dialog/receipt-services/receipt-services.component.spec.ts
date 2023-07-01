import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptServicesComponent } from './receipt-services.component';

describe('ReceiptServicesComponent', () => {
  let component: ReceiptServicesComponent;
  let fixture: ComponentFixture<ReceiptServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptServicesComponent]
    });
    fixture = TestBed.createComponent(ReceiptServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
