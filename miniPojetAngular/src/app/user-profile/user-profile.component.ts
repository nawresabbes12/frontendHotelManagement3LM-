import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any; // Stores user data
  imageUrl: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to file input

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    // Get userId from route parameters
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.userService.getUserById(+userId).subscribe(
        (data) => {
          this.user = data;
          this.generateImageUrl();
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }
  // Trigger file input click
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

   // Method to generate full image URL
   private generateImageUrl(): void {
    if (this.user && this.user.imagePath) {
      this.imageUrl = `http://localhost:8080/${this.user.imagePath}`;
    } else {
      // Optional: Set a default image or leave blank
      this.imageUrl = '';
    }
  }


  // In your uploadImage method, update the generateImageUrl after successful upload
  private uploadImage(file: File): void {
    if (!this.user.id) {
      Swal.fire({
        title: 'Error!',
        text: 'User ID is missing.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }this.userService.uploadUserImage(this.user.id, file).subscribe({
      next: (response) => {
        // Update local user data with new image path
        this.user = response;
        // Regenerate image URL after upload
        this.generateImageUrl();

        Swal.fire({
          title: 'Success!',
          text: 'Profile image uploaded successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        Swal.fire({
          title: 'Upload Failed!',
          text: 'Failed to upload profile image. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type and size
      if (!this.validateFile(file)) {
        return;
      }

      // Create a FileReader to preview the image
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageUrl = e.target.result;

        // Upload the image file
        this.uploadImage(file);
      };

      reader.readAsDataURL(file); // Convert image to base64
    }
  }

  

  // File validation method
  private validateFile(file: File): boolean {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        title: 'Invalid File Type!',
        text: 'Please upload a valid image (JPEG, PNG, or GIF).',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return false;
    }
    // Validate file size (e.g., max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      Swal.fire({
        title: 'File Too Large!',
        text: 'Image size should not exceed 5MB.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return false;
    }

    return true;
  }

  



  
  
}
