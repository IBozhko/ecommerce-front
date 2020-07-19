import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  productCategories = [];
  underDiscountOptions = ['yes', 'no'];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(
      data => this.productCategories = data
    );
    this.productForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      'unitPrice': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),
      'imageUrl': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),'underDiscount': new FormControl(this.underDiscountOptions[0], [
        Validators.required
      ])
    });
  }

  get name() {return this.productForm.get('name');}
  get description() {return this.productForm.get('description');}
  get unitPrice() {return this.productForm.get('unitPrice');}
  get imageUrl() {return this.productForm.get('imageUrl');}
  get underDiscount() {return this.productForm.get('underDiscount');}

  onSubmit(productForm){
    let newProduct: Product = new Product();
    newProduct.name = productForm.name;
    newProduct.description = productForm.description;
    newProduct.unitPrice = productForm.unitPrice;
    newProduct.imageUrl = `assets/images/products/${productForm.imageUrl}`;
    newProduct.underDiscount = productForm.underDiscount;

    this.productService.addProduct(newProduct).subscribe(
      (data: Product) =>{
        console.log(data);
        this.productForm.reset();
        window.location.reload();
      }
    );
  }
}
