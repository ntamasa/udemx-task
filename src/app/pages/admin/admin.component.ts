import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
