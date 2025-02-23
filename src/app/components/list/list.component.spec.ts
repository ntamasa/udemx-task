import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ReservationService } from '../../services/reservationService';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let reservationService: jasmine.SpyObj<ReservationService>;

  beforeEach(async () => {
    const reservationServiceSpy = jasmine.createSpyObj('ReservationService', [
      'getReservations',
      'getCars',
      '$combinedData',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: ReservationService, useValue: reservationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(
      ReservationService
    ) as jasmine.SpyObj<ReservationService>;
    reservationService.$combinedData = of({
      cars: [],
      filteredCars: [],
      reservations: [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get grid classes for more than 3 items', () => {
    component.cars = new Array(4).fill({});
    const classes = component.getGridClasses();
    expect(classes).toContain('lg:grid-cols-3');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('sm:grid-cols-2');
  });

  it('should get grid classes for 3 items', () => {
    component.cars = new Array(3).fill({});
    const classes = component.getGridClasses();
    expect(classes).toContain('lg:grid-cols-3');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('sm:grid-cols-2');
  });

  it('should get grid classes for 2 items', () => {
    component.cars = new Array(2).fill({});
    const classes = component.getGridClasses();
    expect(classes).toContain('lg:grid-cols-2');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('sm:grid-cols-2');
  });

  it('should get grid classes for 1 item', () => {
    component.cars = new Array(1).fill({});
    const classes = component.getGridClasses();
    expect(classes).toContain('lg:grid-cols-1');
    expect(classes).toContain('md:grid-cols-1');
    expect(classes).toContain('sm:grid-cols-1');
  });
});
