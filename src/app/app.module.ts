import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumPostContentComponent } from './components/forum-post-content/forum-post-content.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DiscountComponent } from './components/discount/discount.component';
import { HelpComponent } from './components/help/help.component';
 
const routes: Routes =[
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'forum/:id', component: ForumPostContentComponent},
  {path: 'editItem/:id', component: EditItemComponent},
  {path: 'addAdmin', component: AddProductComponent},
  {path: 'edit', component: EditUserComponent},
  {path: 'editAdmin', component: EditProductComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'userPage', component: UserPageComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'help', component: HelpComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    CheckoutComponent,
    CartStatusComponent,
    LoginComponent,
    RegistrationComponent,
    UserPageComponent,
    ForumComponent,
    ForumPostContentComponent,
    EditUserComponent,
    EditProductComponent,
    EditItemComponent,
    AddProductComponent,
    DiscountComponent,
    HelpComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
