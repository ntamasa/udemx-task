import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservationService';
import { CardComponent } from '../card/card.component';
import { Car } from '../../model/car';

@Component({
  selector: 'app-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  cars: Car[] = [];
  private sub!: Subscription;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.sub = this.reservationService.$data.subscribe((cars) => {
      this.cars = cars;
    });
    this.reservationService.loadCars();
  }

  trackById(index: number, car: Car): string {
    return car.id;
  }
}
