import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrMessageComponent } from './err-message.component';

describe('ErrMessageComponent', () => {
  let component: ErrMessageComponent;
  let fixture: ComponentFixture<ErrMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
