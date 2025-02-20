import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/adminService';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormCarDetailsComponent } from '../../components/form-car-details/form-car-details.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  imports: [
    ListComponent,
    AdminLoginComponent,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  isLoggedIn: boolean = false;
  email: string | null = localStorage.getItem('user');

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {}

  goToHome(): void {
    this.router.navigate(['/']);
    this.adminService.logout();
  }

  checkLoginStatus(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
    this.email = localStorage.getItem('user');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormCarDetailsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
