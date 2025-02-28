import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Car } from '../../model/car';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { Reservation } from '../../model/reservation';
import { FormCarDetailsComponent } from '../form-car-details/form-car-details.component';
import { ReservationService } from '../../services/reservationService';
import { MatSnackBar } from '@angular/material/snack-bar';

const QUANTITY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
`;

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  @Input() car: Car = {} as Car;
  @Input() isAdmin: boolean = false; // if true, show cards for reservation information
  @Input() reservation: Reservation | null = null;
  readonly dialog = inject(MatDialog);

  constructor(private reservationService: ReservationService) {
    // Icon stuff
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral(
      'quantity',
      sanitizer.bypassSecurityTrustHtml(QUANTITY_ICON)
    );
  }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      data: this.car,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this._snackBar.open(
        result
          ? 'Sikeres foglalás!'
          : 'Sikertelen foglalás, az időpont foglalt! ❌',
        'Bezárás',
        {
          duration: 2000,
        }
      );
    });
  }

  openModifyDialog(): void {
    const dialogRef = this.dialog.open(FormCarDetailsComponent, {
      data: { car: this.car, isEditing: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this._snackBar.open(
        result ? 'Sikeres módosítás!' : 'Sikertelen módosítás!',
        'Bezárás',
        {
          duration: 2000,
        }
      );
    });
  }

  onDelete(): void {
    if (this.reservation)
      this.reservationService.deleteReservation(this.reservation.id);
    else this.reservationService.deleteCar(this.car.id);
  }
}
