import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  product: Product ;
  productForm: FormGroup;
  underDiscountOptions = ['yes', 'no'];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.getProduct()
    });
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

  getProduct() {
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  onSubmit(productForm){
    let newProduct: Product = new Product();
    newProduct.id = this.product.id;
    newProduct.name = productForm.name;
    newProduct.description = productForm.description;
    newProduct.unitPrice = productForm.unitPrice;
    newProduct.imageUrl = `assets/images/products/${productForm.imageUrl}`;
    newProduct.underDiscount = productForm.underDiscount;

    this.productService.updateProduct(newProduct).subscribe(
      () =>{
        this.productForm.reset();
        this.router.navigate(['editAdmin']);
      }
    );
  }
}
