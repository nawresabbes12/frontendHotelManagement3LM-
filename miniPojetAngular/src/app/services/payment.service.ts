// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  confirmPayment(paymentInfo: any): Observable<any> {
    return this.http.post('/api/payment/confirm', paymentInfo);
  }
}
