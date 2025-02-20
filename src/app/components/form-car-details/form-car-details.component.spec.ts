import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarDetailsComponent } from './form-car-details.component';

describe('FormCarDetailsComponent', () => {
  let component: FormCarDetailsComponent;
  let fixture: ComponentFixture<FormCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCarDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
