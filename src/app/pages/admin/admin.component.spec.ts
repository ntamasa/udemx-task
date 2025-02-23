import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { AdminService } from '../../services/adminService';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let adminService: AdminService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminComponent,
        MatDialogModule,
        MatButtonModule,
        MatTabsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [AdminService],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    adminService = TestBed.inject(AdminService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login status', () => {
    localStorage.setItem('user', 'example.@example.com');

    component.checkLoginStatus(true);
    expect(component.isLoggedIn).toBe(true);
    expect(localStorage.getItem('user')).not.toBeNull();
  });

  it('should open a dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
