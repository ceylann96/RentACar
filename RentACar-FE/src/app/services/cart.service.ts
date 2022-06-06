import { Injectable } from '@angular/core';
import { CarDetail } from '../models/car/carDetail';
import { CartItem } from '../models/cart/cartItem';
import { CartItems } from '../models/cart/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:CarDetail) {

    let item = CartItems.find(c => c.car.carId===car.carId)

    if(item) {
      item.quantity += 1;
    }
    else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1
      CartItems.push(cartItem);
    }

  }

  removeFromCart(car:CarDetail){
    let item:any = CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  listCart():CartItem[] {
    return CartItems;
  }

}
