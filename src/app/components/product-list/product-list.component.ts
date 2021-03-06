import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  currentUser: User;
  loggedIn: string;

  //parameters for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('loggedIn');
  }
  
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {

    //get keyword from router
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    //if we have different keyword than in previous search set thePageNumber to 1
    if (this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    //search for products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult())
  }

  handleListProducts(){
   //check if id param is available
   const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

   if (hasCategoryId) {
     //get the id param string
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
   }
   else{
     // if not available default to id 1
     this.currentCategoryId = 1;
   }

   if (this.previousCategoryId != this.currentCategoryId){
     this.thePageNumber = 1;
   }

   this.previousCategoryId = this.currentCategoryId;
 
   //now get the prodcuts for given category id
     this.productService.getProductListPaginate(this.thePageNumber - 1,
                                        this.thePageSize,
                                        this.currentCategoryId).subscribe(this.processResult()) 
  }

  addToFavorites(id: number){
    this.userService.addToFavorites(id).subscribe(() =>{});
  }

  processResult(){
    return data =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product){

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
