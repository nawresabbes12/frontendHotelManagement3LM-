import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user ={
  firstName: '',
  lastName:  '',
  email: '',
  password: ''
 
  };

  constructor(private authservice:AuthService ,private http: HttpClient,private router: Router) {}

  onSubmit() {
    this.authservice.registerUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);  // Redirige vers la page de login après l'inscription
      },
      (error) => {
        console.error('Error registering user', error);
      }
    );
  }
  
}

