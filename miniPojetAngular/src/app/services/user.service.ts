import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // L'URL de votre JSON Server

  constructor(private http: HttpClient) {}

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

    
  
    UpdateUser(userData: any): Observable<any> {
      return this.http.put(`http://localhost:8080/api/users/${userData.id}`, userData);
    }
    
  
  
  // Method for uploading user image
  uploadUserImage(userId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.patch<any>(`${this.apiUrl}/${userId}/uploadImage`, formData);
  }
    
}
