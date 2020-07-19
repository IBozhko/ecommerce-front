import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(){
    if (localStorage.length > 0){
      this.cartItems = JSON.parse(localStorage.getItem('currentCart'))
      this.computeCartTotals();
    }
  }

  removeItem(theCartItem: CartItem){
    for (let cartItem of this.cartItems){
      if (cartItem == theCartItem){
        if (cartItem.quantity > 1){
          cartItem.quantity--
          break;
        }
        else{
          const index = this.cartItems.indexOf(cartItem);
          this.cartItems.splice(index, 1);
          break;
        }
      }
    }

    localStorage.setItem('currentCart', JSON.stringify(this.cartItems));
    this.computeCartTotals();
  }

  addToCart(theCartItem: CartItem) {

    //check if item already exists in cart
    let alreadyExistsInCart: boolean = false;
    let exsitingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0){
      //find item in the cart
      for (let tempCartItem of this.cartItems){
        if (tempCartItem.id == theCartItem.id){
          exsitingCartItem = tempCartItem;
          break;
        }
      }

      //check if item is found
      alreadyExistsInCart = (exsitingCartItem != undefined);
    }

    if (alreadyExistsInCart){
      //if item exists just increment total quantity
      exsitingCartItem.quantity++;
    }
    else{
      //if item doesnt exist in cart add it to cart
      this.cartItems.push(theCartItem)
    }

    localStorage.setItem('currentCart', JSON.stringify(this.cartItems));

    this.computeCartTotals();
  }

  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //send data to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('All items in cart:')
    for (let tempItem of this.cartItems){
      console.log(`name: ${tempItem.name}, quantity: ${tempItem.quantity}, unitPrice: ${tempItem.unitPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----')
  }
}
