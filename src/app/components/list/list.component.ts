import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservationService';
import { CardComponent } from '../card/card.component';
import { Car } from '../../model/car';
import { Reservation } from '../../model/reservation';

@Component({
  selector: 'app-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @Input() isAdmin: boolean = false; // if true, show reservations for admin page

  cars: Car[] = [];
  reservations: Reservation[] = [];
  private sub!: Subscription;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.sub = this.reservationService.$combinedData.subscribe(
      ({ cars, filteredCars, reservations }) => {
        this.reservations = reservations;
        this.cars = filteredCars;
        this.reservations.forEach((res) => {});
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCarByReservation(resId: string): Car {
    return this.cars.find((car) => car.id === resId)!;
  }

  getGridClasses(isAdmin: boolean = false): string {
    const classes = [
      'grid',
      'grid-cols-1',
      'gap-4',
      'my-10',
      'mx-5',
      'justify-items-center',
    ];
    if (this.reservations.length > 3 || (!isAdmin && this.cars.length > 3)) {
      classes.push('lg:grid-cols-3');
    } else {
      classes.push(`lg:grid-cols-${this.reservations.length}`);
    }
    if (this.reservations.length > 2 || (!isAdmin && this.cars.length > 2)) {
      classes.push('md:grid-cols-2');
      classes.push('sm:grid-cols-2');
    } else {
      classes.push(`md:grid-cols-${this.reservations.length}`);
      classes.push(`sm:grid-cols-${this.reservations.length}`);
    }
    return classes.join(' ');
  }

  trackById(index: number, car: Car): string {
    return car.id;
  }
  trackResById(index: number, res: Reservation): string {
    return res.id;
  }
}
