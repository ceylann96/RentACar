import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl ="https://localhost:44308/api/colors";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "/getall");
  }

  getColorById(colorId:number):Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl + "/getbyid?colorId=" + colorId);
  }

  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", color)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", color)
  }

}
