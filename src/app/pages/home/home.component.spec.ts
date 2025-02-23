import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReservationService } from '../../services/reservationService';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let reservationService: ReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [ReservationService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    reservationService = TestBed.inject(ReservationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give range error', () => {
    const today = new Date();

    component.range.setValue({
      start: new Date(today.setDate(today.getDate() - 10)),
      end: new Date(),
    });
    expect(component.errMessage).toBe('Helytelen dátum formátum! ❌');
  });

  it('should filter cars by date', () => {
    spyOn(reservationService, 'filterCarsByDate');
    const today = new Date();
    component.range.setValue({
      start: new Date(today.setDate(today.getDate() + 10)),
      end: new Date(today.setDate(today.getDate() + 20)),
    });
    expect(reservationService.filterCarsByDate).toHaveBeenCalled();
  });
});
