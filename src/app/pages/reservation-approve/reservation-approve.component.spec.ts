import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationApproveComponent } from './reservation-approve.component';

describe('ReservationApproveComponent', () => {
  let component: ReservationApproveComponent;
  let fixture: ComponentFixture<ReservationApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationApproveComponent]
    });
    fixture = TestBed.createComponent(ReservationApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
