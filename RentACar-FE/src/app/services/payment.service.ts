import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44308/api/payments";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<Payment> {
    return this.httpClient.post<Payment>(this.apiUrl + "/add", payment)
  }

}
