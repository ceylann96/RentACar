import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfos } from 'src/app/models/authentication/userInfos';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-use-password-update',
  templateUrl: './use-password-update.component.html',
  styleUrls: ['./use-password-update.component.css']
})
export class UsePasswordUpdateComponent implements OnInit {

  user:UserInfos;
  userInfosUpdateForm:FormGroup;

  constructor(private userService:UserService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
      let email = this.localStorage.get("email");
      this.getUserByEmail(email == undefined
                          ? email = ""
                          : email.toString());
      this.createUserInfosUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  createUserInfosUpdateForm(){
    this.userInfosUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  updateUserInfos(){
    this.userInfosUpdateForm.patchValue({ id: this.user.id })
    if(this.userInfosUpdateForm.valid){
      let userInfoModel = Object.assign({},this.userInfosUpdateForm.value);
      this.userService.updateUserInfos(userInfoModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Başarılı")
        this.localStorage.set("email", this.userInfosUpdateForm.get("email")?.value)
        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
          if (responseError.error.ValidationErrors.length>0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatalı")
              
            }
          }
        })
    }
    else{
      this.toastrService.error("Form Eksik.","Dikkat!")
    }
  }

}
