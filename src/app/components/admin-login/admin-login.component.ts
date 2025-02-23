import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);
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
    const loginStatus = this.adminService.login(
      loginData.email,
      loginData.password
    );
    loginStatus ? this.onLoginSuccess() : this.onLoginFailure();
  }

  onLogout(): void {
    this.adminService.logout();
    this.isLoggedIn.emit(false);
  }

  onLoginSuccess(): void {
    this.isLoggedIn.emit(true);
    this._snackBar.open('Sikeres bejelentkezés!', 'Bezárás', {
      duration: 2000,
    });
  }

  onLoginFailure(): void {
    this._snackBar.open('Hibás email vagy jelszó!', 'Bezárás', {
      duration: 2000,
    });
  }
}
