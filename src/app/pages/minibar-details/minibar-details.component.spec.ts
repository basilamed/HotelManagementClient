import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinibarDetailsComponent } from './minibar-details.component';

describe('MinibarDetailsComponent', () => {
  let component: MinibarDetailsComponent;
  let fixture: ComponentFixture<MinibarDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinibarDetailsComponent]
    });
    fixture = TestBed.createComponent(MinibarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
