import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  products: Product[] = []

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  deleteItem(productId){
    this.productService.deleteProductById(productId).subscribe(
    () => console.log(`Product with id ${productId} is deleted`)
    );
    this.productService.getAllProducts().subscribe(data => this.products = data);
    window.location.reload();
  }
}
