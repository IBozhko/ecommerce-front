import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.cartItems;
  }

  removeItem(theCartItem: CartItem){
    this.cartService.removeItem(theCartItem);
  }
}


