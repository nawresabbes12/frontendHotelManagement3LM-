import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/api/rooms'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Optional: Add methods for other room-related operations
  getRoomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  bookRoom(roomId: number, bookingDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${roomId}/book`, bookingDetails);
  }
  getRoomTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/room-types`);
  }

  getRoomsByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rooms?type=${type}`);
  }
}