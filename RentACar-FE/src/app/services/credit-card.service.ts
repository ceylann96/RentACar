import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CreditCard } from '../models/payment/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl ="https://localhost:44308/api/creditcards";

  constructor(private httpClient:HttpClient) { }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl + "/getbycustomerid?customerId=" + customerId);
  }

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", creditCard)
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", creditCard)
  }

}
