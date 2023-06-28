import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReservationComponent } from './request-reservation.component';

describe('RequestReservationComponent', () => {
  let component: RequestReservationComponent;
  let fixture: ComponentFixture<RequestReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestReservationComponent]
    });
    fixture = TestBed.createComponent(RequestReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
