import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
interface Slide {
  image: string;
  
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  slides: Slide[] = [
    { 
      image: 'https://www.quellenhof-seelodge.it/fileadmin/_processed_/4/0/csm_QH_See_Lodge_See_Suite_2_6b584a407d.jpg', 
      
    },
    { 
      image: 'https://www.fourseasons.com/alt/img-opt/~75.701.0,0000-23,7500-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/MUM/MUM_448_original.jpg', 
      
    },
    { 
      image: 'https://cache.marriott.com/content/dam/marriott-renditions/SZXXR/szxxr-grand-7950-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=540px:*', 
      
    }
  ];
  currentSlide: number = 0;
  currentUserId: string | null = null;
  reservations: Reservation[] = [];
  lastReservation: Reservation | null = null; // Store the last reservation
  reservation: Reservation = {
    userId: '', // Dynamically set
    roomType: '',
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
    roomId: '',
    amount: 0, // Initialize the amount to 0
    id: '',
    paymentStatus: ''
  };
  availabilityMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.startSlideshow();
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.id;
      this.loadUserReservations();
    }

    


  }


  // Load existing reservations for the current user
  loadUserReservations() {
    if (!this.currentUserId) return;

    this.reservationService
      .getReservationsByUser(this.currentUserId)
      .subscribe((reservations) => {
        this.reservations = reservations;
        if (this.reservations.length > 0) {
          this.lastReservation = this.reservations[this.reservations.length - 1];
        } else {
          this.lastReservation = null;
        }
      });
  }

  onReserve() {
    if (!this.currentUserId) {
      this.availabilityMessage = 'Veuillez vous connecter pour réserver.';
      return;
    }

    const newReservation: Reservation = {
      ...this.reservation,
      userId: this.currentUserId,
      amount: this.generateRandomAmount(), // Generate random amount
    };

    this.reservationService.addReservation(newReservation).subscribe(
      (reservation) => {
        this.reservations.push(reservation);
        this.lastReservation = reservation; // Update the last reservation after adding new one

        // Display SweetAlert confirmation
        Swal.fire({
          title: 'Réservation réussie!',
          text: 'Votre réservation a été effectuée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.availabilityMessage = 'Réservation réussie!';
      },
      (error) => {
        console.error('Erreur lors de la réservation :', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la réservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.availabilityMessage = "Erreur lors de la réservation.";
      }
    );
  }

  // Generate a random amount for the reservation
  private generateRandomAmount(): number {
    return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
  }
  startSlideshow() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000); // Slide every 5 seconds
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  cancelReservation(reservationId: string): void {
    if (!this.currentUserId) {
      console.error('User is not logged in');
      Swal.fire({
        title: 'Erreur!',
        text: 'Vous devez être connecté.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Convert reservation ID to number
    const parsedReservationId = Number(reservationId);
    const userId = Number(this.currentUserId);

    this.reservationService.cancelReservation(parsedReservationId, userId).subscribe({
      next: () => {
        console.log('Reservation cancelled successfully');
        Swal.fire({
          title: 'Annulation réussie!',
          text: 'Votre réservation a été annulée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadUserReservations(); // Refresh reservations list after cancellation
      },
      error: (err) => {
        console.error('Failed to cancel reservation', err);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de l\'annulation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }



  confirmPayment(reservationId: string) {
    Swal.fire({
      title: 'Confirmer le paiement',
      text: 'Voulez-vous vraiment procéder au paiement de cette réservation ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, payer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.processPayment(reservationId);
      }
    });
  }

  processPayment(reservationId: string): void {
    this.reservationService.updateReservationPaymentStatus(reservationId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Paiement réussi',
          text: 'Le paiement a été effectué avec succès',
          icon: 'success'
        });
        this.loadUserReservations(); // Recharge les réservations pour refléter le statut mis à jour
      },
      error: (error) => {
        console.error('Erreur de paiement:', error);
        Swal.fire({
          title: 'Erreur de paiement',
          text: 'Une erreur est survenue lors du traitement du paiement',
          icon: 'error'
        });
      }
    });
  }
  



  
  
}