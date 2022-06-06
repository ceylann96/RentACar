import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car/car';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetail } from '../models/car/carDetail';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44308/api/cars';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "/getbyid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsById(carId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "/getcardetails?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:Number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "/getcarsbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:Number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "/getcarsbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByFilter(brandId:Number,colorId:Number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + `/getcarsbyfilter?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", car)
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", car)
  }

}
