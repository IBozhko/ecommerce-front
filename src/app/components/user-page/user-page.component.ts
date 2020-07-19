import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { UserService } from 'src/app/services/user.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  currentUser: User = new User();
  orders = [];
  favorites: Product[] = [];
  forumPosts = [];
  loggedIn: string;

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private productService: ProductService,
    private userService: UserService,
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('loggedIn');
    this.forumService.getForumPostsByUser(this.currentUser.login).subscribe(data => this.forumPosts = data);
    console.log(this.currentUser.login);
    this.checkoutService.getOrdersByUser(this.currentUser.login).subscribe(
      data => {
        this.orders = data;
      }
    )
    
    if (!(this.currentUser.favorites === undefined)) {
      let favoritesArray = this.currentUser.favorites.split(',');
      for (let currentFavorite of favoritesArray) {
        this.productService.getProduct(currentFavorite).subscribe(
          data => {
            this.favorites.push(data);
          }
        )
      }
    }
  }

  removeFromFavorites(id) {
    this.userService.removeFromFavorites(id).subscribe(() => {});
    window.location.reload();
  }

  deleteForumPost(id: number){
    this.forumService.deleteForumPost(id).subscribe(
      () => console.log(`Forum post with id ${id} is deleted`)
    );
  }
}
