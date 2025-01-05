import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
 

  private apiUrl = 'http://localhost:8080/api/reservations'; // Remplacez par l'URL réelle de l'API

  constructor(private http: HttpClient) {}

  
  private generateRandomAmount(): number {
    return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
  }

  
  addReservation(reservation: Omit<Reservation, 'id' | 'amount'>): Observable<Reservation> {
    const newReservation = {
      ...reservation,
      amount: this.generateRandomAmount(),
    };
    return this.http.post<Reservation>(this.apiUrl, newReservation);
  }

  
  getReservationsByUser(userId: string): Observable<Reservation[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Reservation[]>(url);
  }
  
  getReservationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  
  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put(`/${id}`, reservation);
  }

  cancelReservation(reservationId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${reservationId}/cancel`);
  }


  updateReservationPaymentStatus(reservationId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${reservationId}/pay`, null);
  }

  
  

}
