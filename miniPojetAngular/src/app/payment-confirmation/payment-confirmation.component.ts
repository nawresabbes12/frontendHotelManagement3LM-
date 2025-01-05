import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss'],
})
export class PaymentConfirmationComponent implements OnInit {
  reservation: any;
  paymentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire avec validations
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // 16 chiffres
      expiryDate: ['', [Validators.required, Validators.pattern(/^([0-9]{2})\/([0-9]{2})$/)]], // MM/AA
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // 3 chiffres
    });
  }

  ngOnInit(): void {
    // Vérifier si l'ID de la réservation est présent dans la route
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.loadReservation(reservationId);
    } else {
      console.error('Aucun ID de réservation trouvé.');
      alert('Erreur : Aucun ID de réservation trouvé.');
      this.router.navigate(['/reservations']); // Rediriger vers une page de liste de réservations
    }
  }

  /**
   * Vérifie si un champ du formulaire est invalide.
   */
  isControlInvalid(controlName: string): boolean {
    const control = this.paymentForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Charger les détails de la réservation.
   */
  loadReservation(reservationId: string): void {
    this.reservationService.getReservationById(reservationId).subscribe(
      (data) => {
        if (data) {
          this.reservation = data;
        } else {
          console.error('Aucune réservation trouvée pour cet ID.');
          alert('Aucune réservation trouvée. Redirection vers la liste des réservations.');
          this.router.navigate(['/reservations']);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de la réservation :', error);
        alert('Une erreur est survenue lors du chargement des détails de la réservation.');
        this.router.navigate(['/reservations']);
      }
    );
  }

  /**
   * Confirmer le paiement et mettre à jour l'état de la réservation.
   */
  confirmPayment(): void {
    if (this.reservation && this.paymentForm.valid) {
      const updatedReservation = { ...this.reservation, status: 'Confirmed' };
      this.reservationService.updateReservation(this.reservation.id, updatedReservation).subscribe(
        (response) => {
          console.log('Paiement confirmé :', response);
          alert('Paiement confirmé avec succès !');
          this.router.navigate(['/success']); // Rediriger vers une page de succès
        },
        (error) => {
          console.error('Erreur lors de la confirmation :', error);
          alert('Une erreur est survenue lors de la confirmation du paiement.');
        }
      );
    } else {
      alert('Veuillez remplir correctement le formulaire de paiement.');
    }
  }
}
