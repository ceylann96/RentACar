import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart/cartItem';
import { CarDetail } from 'src/app/models/car/carDetail';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[] = [];

  constructor(private cartService:CartService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.listCart();
  }

  removeFromCart(car:CarDetail){
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.carName + " Kart Silindi")
  }

}
