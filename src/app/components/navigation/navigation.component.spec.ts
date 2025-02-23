import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get admin as path', () => {
    spyOn(component, 'getCurrentPath').and.returnValue('admin');
    const path = component.getCurrentPath();
    expect(path).toBe('admin');
  });

  it('should get home as path', () => {
    spyOn(component, 'getCurrentPath').and.returnValue('');
    const path = component.getCurrentPath();
    expect(path).toBe('');
  });
});
