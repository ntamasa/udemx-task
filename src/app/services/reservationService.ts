import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Car } from '../model/car';

// generate mock data using fakerjs
const mock_cars: Car[] = Array.from(
  { length: 100 },
  () =>
    ({
      id: faker.string.uuid(),
      model: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      year: faker.date.past({ years: 2000 }).getFullYear(),
      price: faker.number.int(50000),
      imageUrl: faker.image.avatar(),
      quantity: faker.number.int({ min: 2, max: 6, multipleOf: 2 }),
    } as Car)
);

@Injectable({
  providedIn: 'root',
})
export class ReservationService implements OnInit {
  cars: Subject<Car[]> = new Subject<Car[]>();
  $data = this.cars.asObservable();

  constructor() {
    this.cars.next(mock_cars);
  }

  loadCars(): void {
    this.cars.next(mock_cars);
  }

  ngOnInit(): void {}
}
