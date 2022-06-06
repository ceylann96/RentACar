import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfos } from '../models/authentication/userInfos';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44308/api/users";

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<SingleResponseModel<UserInfos>> {
    return this.httpClient.get<SingleResponseModel<UserInfos>>(this.apiUrl + "/getbyemail?email=" + email);
  }

  updateUserInfos(user:UserInfos):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/updateinfos", user)
  }

}
