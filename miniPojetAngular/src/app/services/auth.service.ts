import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; 
  private _isAuthenticated = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient) {
    
    const storedUser = localStorage.getItem('currentUser');
    this._isAuthenticated.next(!!storedUser);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._isAuthenticated.next(true); // Met à jour l'état d'authentification
        }
        return user;
      })
    );
  }

  
  registerUser(user: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl, user, { headers });
  }

  validateUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find(user => user.email === email && user.password === password)) // Retourne l'utilisateur trouvé
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`); // Récupère les données d'un utilisateur spécifique
  }

  logout() {
    localStorage.removeItem('currentUser'); // Supprime l'utilisateur connecté de localStorage
    this._isAuthenticated.next(false); // Met à jour l'état d'authentification
  }

  getIsAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable(); // Expose l'état d'authentification comme observable
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
