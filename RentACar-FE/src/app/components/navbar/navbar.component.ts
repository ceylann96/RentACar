import { Component, OnInit } from '@angular/core';
import { UserInfos } from 'src/app/models/authentication/userInfos';
import { CustomerUser } from 'src/app/models/customer/customerUser';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetails:UserInfos = new UserInfos();
  customerUser:CustomerUser = new CustomerUser();

  constructor(private authService:AuthService,
              private userService:UserService,
              private customerService:CustomerService,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUser(email == null ? email = "" : email.toString());
    this.getCustomerId(email == null ? email = "" : email.toString());
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userDetails = response.data;
    })
  }

  getCustomerId(email:string){
      this.customerService.getCustomersByEmail(email == null ? email="" : email).subscribe(
        response => {
          this.customerUser = response.data;
          this.localStorage.set("customerId", this.customerUser.customerId)
        },
        responseError => { console.log("Henüz Müşteri Değilsiniz!") }
      )
  }

}