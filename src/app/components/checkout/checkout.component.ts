import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/common/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistory } from 'src/app/common/order-history';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items;
  totalPrice: number = 0.00;
  currentUser: User = new User();
  checkoutForm: FormGroup;
  loggedIn: string = 'no';
  payments = ['PayPal', 'SomeOtherThingLikePayPal'];
  shippings = ['2-Day', 'Postal', 'Cheapest'];
  orders = [];

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkoutService.getOrders().subscribe(data => this.orders = data);
    this.items = this.cartService.cartItems;
    this.computeTotals();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('loggedIn');
    this.checkoutForm = new FormGroup({
      'payment': new FormControl('', [
        Validators.required
      ]),
      'shipping': new FormControl('', [
        Validators.required
      ])
    })
  }

  get payment() { return this.checkoutForm.get('payment'); }
  get shipping() { return this.checkoutForm.get('shipping'); }

  onSubmit(customerData) {
    this.checkoutService.getOrders().subscribe(data => this.orders = data);
    if (this.loggedIn == 'yes') {
      const userId = this.currentUser.login;

      let newOrder: OrderHistory = new OrderHistory();

      if (this.orders.length == 0){
        newOrder.id = 1;
      }
      else {
        newOrder.id = this.orders.length + 1;
      }

      newOrder.total = this.totalPrice;
      newOrder.payment = customerData.payment;
      newOrder.shipping = customerData.shipping;
      newOrder.userId = userId;

      this.checkoutService.saveOrder(newOrder).subscribe(
        (data: OrderHistory) => {
          console.log(data);
          this.checkoutForm.reset();
          this.cartService.cartItems = [];
          localStorage.setItem('currentCart', JSON.stringify(this.cartService.cartItems));
          window.location.reload();
        }
      );
    }
    else{
      this.router.navigate(['products']);
    }
  }

  computeTotals() {
    for (let currentItem of this.items) {
      this.totalPrice += currentItem.quantity * currentItem.unitPrice;
    }
  }
}
