import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  room: any; // Holds room details
  loading: boolean = true; // Loading indicator
  errorMessage: string | null = null; // Error message holder

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchRoomDetails();
  }

  /**
   * Fetches the room details using the roomId from the route.
   */
  private fetchRoomDetails(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');

    if (!roomId) {
      this.errorMessage = 'Invalid room ID.';
      this.loading = false;
      return;
    }

    this.http.get(`http://localhost:8080/api/rooms/${roomId}`).subscribe(
      (data) => {
        this.room = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching room details. Please try again later.';
        console.error('Error fetching room details:', error);
        this.loading = false;
      }
    );
  }
  /**
   * Confirms the booking of the room.
   * @param roomId - The ID of the room to book.
   */
  confirmBooking(room: any) {
    if (room.available) {
      // Room is available, show confirmation alert and redirect
      Swal.fire({
        title: 'Confirm Booking',
        text: `Are you sure you want to book the room: ${room.title}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to booking page (replace '/booking' with actual route)
          this.router.navigate(['reservation', room.id]);
        }
      });
    } else {
      // Room is not available, show alert
      Swal.fire({
        title: 'Not Available',
        text: `Sorry, the room: ${room.title} is not available.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  
  
  
}
