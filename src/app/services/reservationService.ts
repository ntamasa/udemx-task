import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';

// generate mock data using fakerjs
const mock_cars: Car[] = Array.from(
  { length: 5 },
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

const mock_reservations: Reservation[] = Array.from({ length: 2 }, () =>
  (function () {
    const startDate = new Date(new Date().setDate(new Date().getDate() + 6));
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(new Date().setDate(new Date().getDate() + 10));
    endDate.setHours(0, 0, 0, 0);
    return {
      id: faker.string.uuid(),
      car_id: getRandomElement(mock_cars).id,
      user_email: faker.internet.email(),
      start_date: startDate,
      end_date: endDate,
      total: 100000,
    } as Reservation;
  })()
);

function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService implements OnInit {
  cars: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>(mock_cars);
  $data = this.cars.asObservable();

  filteredCars: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>(mock_cars);
  $filteredData = this.filteredCars.asObservable();

  reservations: BehaviorSubject<Reservation[]> = new BehaviorSubject<
    Reservation[]
  >(mock_reservations);
  $reservations = this.reservations.asObservable();

  $combinedData = combineLatest([
    this.$data,
    this.$filteredData,
    this.$reservations,
  ]).pipe(
    map(([cars, filteredCars, reservations]) => {
      return {
        cars,
        filteredCars,
        reservations,
      };
    })
  );

  constructor() {}

  ngOnInit(): void {
    this.cars.next(mock_cars);
    this.filteredCars.next(this.cars.getValue());
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
  ): boolean {
    const day = 24 * 60 * 60 * 1000;
    const days = Math.round(
      Math.abs(
        (reservationData.start.getTime() - reservationData.end.getTime()) / day
      )
    );

    // TODO
    if (!this.checkReservationAvailability(carId, reservationData))
      return false;

    const reservation: Reservation = {
      id: faker.string.uuid(),
      car_id: carId,
      user_email: reservationData.email,
      start_date: reservationData.start,
      end_date: reservationData.end,
      total: days * this.getCarById(carId)?.price!,
    };
    const newReservations = [...this.reservations.getValue(), reservation];
    this.reservations.next(newReservations);
    return true;
  }

  deleteReservation(id: string): void {
    const newReservations = this.reservations
      .getValue()
      .filter((reservation) => reservation.id !== id);
    this.reservations.next(newReservations);
  }

  filterCarsByDate(start: Date, end: Date): void {
    const reservationsMatchingDate = this.reservations
      .getValue()
      .filter((reservation) => {
        const reservationStartDate = reservation.start_date;
        const reservationEndDate = reservation.end_date;

        return (
          (end.getTime() >= reservationStartDate.getTime() &&
            end.getTime() <= reservationEndDate.getTime()) ||
          (start.getTime() >= reservationStartDate.getTime() &&
            start.getTime() <= reservationEndDate.getTime())
        );
      });
    if (reservationsMatchingDate.length === 0) {
      this.filteredCars.next(this.cars.getValue());
      return;
    }
    const filteredCars = this.cars.getValue().filter((car) => {
      return !reservationsMatchingDate.some(
        (reservation) => reservation.car_id === car.id
      );
    });

    this.filteredCars.next(filteredCars);
  }

  resetFilter(): void {
    this.filteredCars.next(this.cars.getValue());
  }

  createCar(
    brand: string,
    model: string,
    price: number,
    year: number,
    passengers: number,
    image: string | null | undefined
  ): void {
    const imageUrl = image || faker.image.avatar();

    const newCar = {
      id: faker.string.uuid(),
      brand,
      model,
      price,
      year,
      imageUrl,
      quantity: passengers,
    } as Car;
    const newCars = [...this.cars.getValue(), newCar];
    console.log(newCars);
    this.cars.next(newCars);
    this.filteredCars.next(newCars);
  }

  editCar(
    id: string,
    brand: string,
    model: string,
    price: number,
    year: number,
    passengers: number,
    image: string | null | undefined
  ): void {
    const imageUrl = image || faker.image.avatar();

    // Create new car object
    const newCar = {
      id,
      brand,
      model,
      price,
      year,
      imageUrl,
      quantity: passengers,
    } as Car;

    const newCars = this.cars
      .getValue()
      .map((car) => (car.id === id ? newCar : car));
    this.cars.next(newCars);
    this.filteredCars.next(newCars);
  }

  deleteCar(id: string): void {
    // get all reservations for that car
    const newReservations = this.reservations
      .getValue()
      .filter((reservation) => reservation.car_id !== id);

    // remove car from cars list
    const newCars = this.cars.getValue().filter((car) => car.id !== id);

    // updates
    this.cars.next(newCars);
    this.filteredCars.next(newCars);
    this.reservations.next(newReservations);
  }

  getCarById(id: string): Car | undefined {
    return this.cars.getValue().find((car) => car.id === id);
  }

  getReservedCars(): Car[] {
    return this.cars
      .getValue()
      .filter((car) =>
        this.reservations
          .getValue()
          .some((reservation) => reservation.car_id === car.id)
      );
  }

  // returns true if the car is available for reservation
  checkReservationAvailability(
    carId: string,
    reservationData: {
      address: string;
      email: string;
      end: Date;
      start: Date;
      name: string;
      phone: string;
    }
  ): boolean {
    const reservationsMatchingCar = this.reservations
      .getValue()
      .filter((reservation) => reservation.car_id === carId);

    if (reservationsMatchingCar.length === 0) return true;

    return reservationsMatchingCar.some((reservation) => {
      const reservationStartDate = reservation.start_date;
      const reservationEndDate = reservation.end_date;

      return (
        !(
          reservationData.end.getTime() >= reservationStartDate.getTime() &&
          reservationData.end.getTime() <= reservationEndDate.getTime()
        ) &&
        !(
          reservationData.start.getTime() >= reservationStartDate.getTime() &&
          reservationData.start.getTime() <= reservationEndDate.getTime()
        )
      );
    });
  }
}
