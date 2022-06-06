import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental/rental';
import { SingleResponseModel } from '../models/singleResponseModel';



@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44308/api/rentals";

  constructor(private httpClient:HttpClient) { }

  getRental(rentalId:Number):Observable<SingleResponseModel<Rental>> {
    return this.httpClient.get<SingleResponseModel<Rental>>(this.apiUrl + "/getbyid?rentalId=" + rentalId);
  }

  getIdByRentalInfos(carId:number, customerId:number, rentDate:Date, returnDate:Date):Observable<SingleResponseModel<Rental>> {
    return this.httpClient.get<SingleResponseModel<Rental>>(this.apiUrl + "/getidbyrentalinfos?carId=" + carId
                                                                                         + "&customerId=" + customerId
                                                                                         + "&rentDate=" + rentDate
                                                                                         + "&returnDate=" + returnDate);
  }

  addRental(rental:Rental):Observable<Rental> {
    return this.httpClient.post<Rental>(this.apiUrl + "/add", rental)
  }

}