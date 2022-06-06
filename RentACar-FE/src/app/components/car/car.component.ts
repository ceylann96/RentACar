import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CustomerUser } from 'src/app/models/customer/customerUser';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';




@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
 
  carDetails:CarDetail[];
  customerUsers:CustomerUser;
  carFilterText="";

  constructor(private carService:CarService,
              private cartService:CartService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"] && params["brandId"]){
        this.getCarsByFilter(params["brandId"], params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      }
      else {
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails= response.data;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
    })
  }

  getCarsByFilter(brandId:number, colorId:number){
    this.carService.getCarsByFilter(brandId, colorId).subscribe((response) => {
      this.carDetails = response.data;
    })
  }

  addToCart(car:CarDetail){
    if (car) {
      this.cartService.addToCart(car);
      this.toastrService.success(car.carName + "Sepete Eklendi.")
    }
    else{
      this.toastrService.error("Lütfen tekrar deneyiniz.","Hata!")
    }
  }

}