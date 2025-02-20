import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserRole } from '../model/userRole';

const ADMIN_USER: User = {
  id: 1,
  email: 'admin@admin.com',
  password: 'admin',
  role: UserRole.ADMIN,
};

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnInit {
  adminUser: User = ADMIN_USER;

  constructor() {}

  ngOnInit(): void {}

  login(email: string, password: string): boolean {
    if (
      email === this.adminUser.email &&
      password === this.adminUser.password
    ) {
      localStorage.setItem('user', email);
      return true;
    }
    return false;
  }

  logout(): void {
    if (localStorage.getItem('user')) localStorage.removeItem('user');
  }
}
