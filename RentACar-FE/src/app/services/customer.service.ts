import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer/customer';
import { CustomerUser } from '../models/customer/customerUser';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44308/api/customers";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "/getall");
  }

  getCustomersByEmail(email:string):Observable<SingleResponseModel<CustomerUser>> {
    return this.httpClient.get<SingleResponseModel<CustomerUser>>(this.apiUrl + "/getbyemail?email=" + email);
  }

}