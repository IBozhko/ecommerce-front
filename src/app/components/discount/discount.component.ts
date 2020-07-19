import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  productsUnderDiscount: Product[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProductsUnderDiscount().subscribe(
      data => {
        this.productsUnderDiscount = data;
      }
    );
  }

  addToFavorites(id: number){
    this.userService.addToFavorites(id).subscribe(() =>{});
  }

  addToCart(theProduct: Product){

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

}
