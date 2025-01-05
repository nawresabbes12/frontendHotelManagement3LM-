import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage = ''; // Pour afficher un message d'erreur

  constructor(private authService: AuthService, private router: Router) {
    // Vérification : Si l'utilisateur est déjà connecté, redirection vers son espace
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.router.navigate([`/home/${user.id}`]); // Redirige vers l'espace unique de l'utilisateur
    }
  }

  onLogin() {
    this.authService.validateUser(this.credentials.email, this.credentials.password).subscribe(
      (user) => {
        if (user) {
          console.log('Login successful:', user);
          // Stocker l'utilisateur connecté dans localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Bienvenue ${user.firstName}!`,
            showConfirmButton: false,
            timer: 1200
          });

          // Redirige vers l'espace unique de l'utilisateur
          this.router.navigate([`/home/${user.id}`]);
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    );
  }
}
