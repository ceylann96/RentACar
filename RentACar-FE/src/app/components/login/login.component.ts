import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {

      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(
        response=> {
          this.toastrService.success("Giriş Başarılı.")
          this.localStorage.set("token", response.data.token)
          this.localStorage.set("email",this.loginForm.get("email")?.value)
          setTimeout(()=> {this.router.navigate(['/cars'])}, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error)
        }
      )
      
    }
  }
}
