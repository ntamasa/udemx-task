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
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../services/reservationService';

@Component({
  selector: 'app-create-reservation',
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
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss',
})
export class CreateReservationComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  reservationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/\s/),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,11}$/),
    ]),
    start: new FormControl<Date | null>(null, [
      Validators.required,
      this.dateNotBeforeToday,
    ]),
    end: new FormControl<Date | null>(null, [
      Validators.required,
      this.dateNotBeforeToday,
    ]),
  });

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reservationForm.invalid) return;
    const reservationData = this.reservationForm.value as {
      address: string;
      email: string;
      end: Date;
      start: Date;
      name: string;
      phone: string;
    };
    this.reservationService.createReservation(this.data.id, reservationData);
  }

  // Custom validator to check if the date is not before today
  private dateNotBeforeToday(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (control.value && control.value < today) {
      return { dateNotBeforeToday: true };
    }
    return null;
  }
}
