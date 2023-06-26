import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinibarsComponent } from './minibars.component';

describe('MinibarsComponent', () => {
  let component: MinibarsComponent;
  let fixture: ComponentFixture<MinibarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinibarsComponent]
    });
    fixture = TestBed.createComponent(MinibarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
