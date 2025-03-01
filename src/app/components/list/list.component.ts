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
  @Input() isReservations: boolean = false; // if true, show reservations for admin page, else show cars

  cars: Car[] = [];
  reservations: Reservation[] = [];
  private sub!: Subscription;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.sub = this.reservationService.$combinedData.subscribe(
      ({ cars, filteredCars, reservations }) => {
        this.reservations = reservations;
        this.cars = this.isAdmin ? cars : filteredCars;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCarByReservation(resId: string): Car {
    return this.cars.find((car) => car.id === resId)!;
  }

  getGridClasses(): string {
    const length = this.isReservations
      ? this.reservations.length
      : this.cars.length;

    const classes = [
      'grid',
      'grid-cols-1',
      'gap-4',
      'my-10',
      'mx-5',
      'justify-items-center',
    ];
    if (length > 3) {
      classes.push('lg:grid-cols-3');
    } else {
      classes.push(`lg:grid-cols-${length}`);
    }
    if (length > 2) {
      classes.push('md:grid-cols-2');
      classes.push('sm:grid-cols-2');
    } else {
      classes.push(`md:grid-cols-${length}`);
      classes.push(`sm:grid-cols-${length}`);
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
