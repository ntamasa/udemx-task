import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../../services/adminService';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  @Output() isLoggedIn = new EventEmitter<boolean>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm.value as {
      email: string;
      password: string;
    };
    this.adminService.login(loginData.email, loginData.password);
    this.isLoggedIn.emit(true);
  }

  onLogout(): void {
    this.adminService.logout();
    this.isLoggedIn.emit(false);
  }
}
