import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedReservationsComponent } from './approved-reservations.component';

describe('ApprovedReservationsComponent', () => {
  let component: ApprovedReservationsComponent;
  let fixture: ComponentFixture<ApprovedReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedReservationsComponent]
    });
    fixture = TestBed.createComponent(ApprovedReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
