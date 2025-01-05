import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {  HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null; // Stores the logged-in user details
  scrolled = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  /**
   * Loads the currently logged-in user from the AuthService.
   */
  private loadCurrentUser(): void {
    this.user = this.authService.getCurrentUser();
  }

  /**
   * Logs out the user and redirects to the login page.
   */

logout(): void {
  this.authService.logout(); // Clear user session via AuthService
  this.router.navigate(['/login']); // Redirect to login page
  // Optionally, you can also clear any local storage or session storage items related to the user
  localStorage.removeItem('currentUser'); // Clear any remaining user data from local storage
  sessionStorage.clear(); // Clear all session data
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50;
  }
}

