import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Slide {
  image: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: Slide[] = [
    { image: 'https://www.alppasa.com/upload/tr/sayfa/44/img/big/sikca-sorulan-sorular-9350f.webp', title: 'Luxury Awaits' },
    { image: 'https://media.architecturaldigest.com/photos/659d9fbfe6cba71cbe6077f6/16:9/w_2560%2Cc_limit/atr.royalmansion-bar-mr.jpg', title: 'Elegant Spaces' },
    { image: 'https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg', title: 'Comfort Redefined' }
  ];
  currentSlide: number = 0;
  rooms: any[] = [];
  filteredRooms: any[] = [];

  constructor(private roomService: RoomService, private router: Router) {} 

  ngOnInit(): void {
    this.startSlideshow();
    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        this.filteredRooms = [...this.rooms]; 
      },
      (error) => {
        console.error('Error fetching room data:', error);
      }
    );
  }

  startSlideshow() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000); 
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  confirmBooking(room: any) {
    if (room.available) {
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
          this.router.navigate(['reservation', room.id], { 
            queryParams: { roomType: room.type } 
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Not Available',
        text: `Sorry, the room: ${room.title} is not available.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}