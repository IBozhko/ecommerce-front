import { Injectable } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private url: string = 'http://localhost:8080/api/orderHistories';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getOrders(): Observable<OrderHistory[]> {
    return this.httpClient.get<GetResponseOrderHistories>(this.url).pipe(map(response => response._embedded.orderHistories));
  }

  public getOrdersByUser(userId: string): Observable<OrderHistory[]>{

    const ordersUrlWithId = this.url + '/search/findByUserIdContaining?userId=' + userId;
    
    return this.httpClient.get<GetResponseOrderHistories>(ordersUrlWithId).pipe(map(response => response._embedded.orderHistories));
  }

  public saveOrder(order: OrderHistory): Observable<OrderHistory> {
    return this.httpClient.post<OrderHistory>(this.url, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

interface GetResponseOrderHistories {
  _embedded: {
    orderHistories: OrderHistory[];
  }
}
