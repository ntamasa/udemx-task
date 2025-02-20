import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../services/reservationService';
import { Car } from '../../model/car';

@Component({
  selector: 'app-create-car',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.scss',
})
export class CreateCarComponent implements OnInit {
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {}

  newCarForm = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    model: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    year: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^(19[0-9]{2}|20[0-1][0-9]|20[2][0-5])$/),
    ]),
    passengers: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(7),
    ]),
    imageUrl: new FormControl('', [Validators.maxLength(250)]),
  });

  onSubmit(): void {
    if (this.newCarForm.invalid) return;

    const { brand, model, price, year, passengers, imageUrl } =
      this.newCarForm.value;

    this.reservationService.createCar(
      brand!,
      model!,
      price!,
      year!,
      passengers!,
      imageUrl
    );
  }
}
