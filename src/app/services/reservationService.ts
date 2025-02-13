import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';

// generate mock data using fakerjs
const mock_cars: Car[] = Array.from(
  { length: 100 },
  () =>
    ({
      id: faker.string.uuid(),
      model: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      year: faker.date
        .birthdate({ mode: 'year', min: 1990, max: new Date().getFullYear() })
        .getFullYear(),
      price: Math.round(faker.number.int(50000) / 1000) * 1000,
      imageUrl: faker.image.avatar(),
      quantity: faker.number.int({ min: 2, max: 6, multipleOf: 2 }),
    } as Car)
);

const mock_reservations: Reservation[] = Array.from(
  { length: 2 },
  () =>
    ({
      id: faker.string.uuid(),
      car_id: getRandomElement(mock_cars).id,
      user_email: faker.internet.email(),
      start_date: new Date(
        new Date().setDate(new Date().getDate() + 6)
      ).toISOString(), // 6 days from today
      end_date: new Date(
        new Date().setDate(new Date().getDate() + 10)
      ).toISOString(), // 10 days from today
      total: 100000,
    } as Reservation)
);

function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService implements OnInit {
  cars: Subject<Car[]> = new Subject<Car[]>();
  $data = this.cars.asObservable();

  reservations: Subject<Reservation[]> = new Subject<Reservation[]>();
  $reservations = this.reservations.asObservable();

  constructor() {
    this.cars.next(mock_cars);
    this.reservations.next([] as Reservation[]);
  }

  ngOnInit(): void {}

  loadCars(): void {
    this.cars.next(mock_cars);
  }

  loadReservations(): void {
    this.reservations.next(mock_reservations);
  }

  createReservation(
    carId: string,
    reservationData: {
      address: string;
      email: string;
      end: Date;
      start: Date;
      name: string;
      phone: string;
    }
  ): void {
    const days =
      reservationData.end.getDate() - reservationData.start.getDate();

    const reservation: Reservation = {
      id: faker.string.uuid(),
      car_id: carId,
      user_email: reservationData.email,
      start_date: reservationData.start.toISOString(),
      end_date: reservationData.end.toISOString(),
      total: days * this.getCarById(carId)?.price!,
    };
    mock_reservations.push(reservation);
    this.reservations.next(mock_reservations);
  }

  getCarById(id: string): Car | undefined {
    return mock_cars.find((car) => car.id === id);
  }
}
