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
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ReservationService } from '../../services/reservationService';

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponent,
    JsonPipe,
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

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    this.range.valueChanges.subscribe(({ start, end }) => {
      if (start && end) this.reservationService.filterCarsByDate(start, end);
    });
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
