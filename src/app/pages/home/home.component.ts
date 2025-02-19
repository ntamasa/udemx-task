import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListComponent } from '../../components/list/list.component';
import { ReservationService } from '../../services/reservationService';
import { HeroComponent } from '../../components/hero/hero.component';
import { ErrMessageComponent } from '../../components/err-message/err-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponent,
    HeroComponent,
    ErrMessageComponent,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  currentDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  errMessage: string = '';

  constructor(private reservationService: ReservationService) {
    this.range.valueChanges.subscribe(({ start, end }) => {
      if (!start || !end) return;

      if (start < this.currentDate || end < this.currentDate) {
        this.errMessage = 'Please select a valid date! ❌';
        return;
      }

      this.reservationService.filterCarsByDate(start, end);
      this.errMessage = '';
    });
  }
}
