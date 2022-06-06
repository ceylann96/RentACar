import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44308/api/brands";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "/getall");
  }

  getBrandById(brandId:number):Observable<SingleResponseModel<Brand>> {
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl + "/getbyid?brandId=" + brandId);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", brand)
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", brand)
  }
}
