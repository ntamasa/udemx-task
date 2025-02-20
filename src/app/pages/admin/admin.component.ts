import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/adminService';

@Component({
  selector: 'app-admin',
  imports: [ListComponent, AdminLoginComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
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
}
