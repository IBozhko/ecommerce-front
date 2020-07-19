import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(
    private httpClient: HttpClient
    ) { }

    getAllProducts(){
      return this.httpClient.get<GetResponseProducts>('http://localhost:8080/api/products?page=0&size=100').pipe(map(response => response._embedded.products));
    }

  getProduct(theProductId): Observable<Product> {

    //build URL using product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //build URL using categoy id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    //build URL using keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  public updateProduct(product: Product): Observable<void>{
    return this.httpClient.put<void>(`${this.baseUrl}/${product.id}`, product,{
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   });
 }

 getProductsUnderDiscount(): Observable<Product[]>{
  const discountUrl = `${this.baseUrl}/search/findByUnderDiscountContaining?underDiscount=yes`;
  return this.getProducts(discountUrl);
 }

  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string): Observable<GetResponseProducts> {

    //build url using keyword and page parameters to support pagination
    const url = `${this.baseUrl}/search/findByNameContaining` +
      `?name=${theKeyword}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(url);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    const url = `${this.baseUrl}/search/findByCategoryId` +
      `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(url);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteProductById(productId: number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${productId}`);
  }
}

interface GetResponseProductsNoPaginate {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
