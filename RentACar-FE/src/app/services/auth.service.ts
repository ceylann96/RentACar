import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/authentication/loginModel';
import { RegisterModel } from '../models/authentication/registerModel';
import { TokenModel } from '../models/authentication/tokenModel';
import { UserPasswordChangingModel } from '../models/authentication/userPasswordChangingModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44308/api/auth/';

  constructor(private httpClient:HttpClient,
              private localStorage:LocalStorageService) { }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  logout() {
    this.localStorage.remove("token")
    return true;
  }

  isAuthenticated() {
    if(this.localStorage.get("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  updateUserPassword(userPasswordChangingModel:UserPasswordChangingModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "changepassword", userPasswordChangingModel)
  }

}