import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  userId: number | null = null; // Initialize userId to null or a default value
  userData: any = {}; // Temporary storage for user data

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    this.userId = idFromRoute ? parseInt(idFromRoute, 10) : null;
  
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.userData = data;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      console.error('Invalid user ID.');
    }
  }
  

  UpdateProfile() {
    if (this.userId !== null && this.userData) {
      this.userData.id = this.userId;
      
      this.userService.UpdateUser(this.userData).subscribe({
        next: (data) => {
          console.log('Profile updated successfully!', data);
          Swal.fire({
            title: 'Profile Updated!',
            text: 'Your profile has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50'
          });
          
          // Optionnel : Mettre à jour les données locales
          this.userData = data;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          Swal.fire({
            title: 'Error!',
            text: `Failed to update profile. ${error.message || 'Unknown error'}`,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff0000'
          });
        }
      });
    } else {
      // Gestion d'erreur si données invalides
      Swal.fire({
        title: 'Invalid Data!',
        text: 'User ID or profile data is missing. Please check your input.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffcc00'
      });
    }
  }
  
}
