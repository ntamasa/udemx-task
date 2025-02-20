import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  changePage(): void {
    const currentPath = this.getCurrentPath();
    this.router.navigate([`/${!currentPath ? 'admin' : ''}`]);
  }

  getCurrentPath(): string {
    return this.router.url.split('/')[1];
  }
}
