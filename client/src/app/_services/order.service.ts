import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  orderCreate(orderform) {
    return this.http.post(this.baseUrl + 'orders/order', orderform);
  }

  orderQuantityCheck(items) {
    return this.http.post(this.baseUrl + 'orders/ordercheck', items);
  }

  getOrderById(id: string) {
  return this.http.get<IOrder[]>(this.baseUrl + 'orders/getOrderById/' + id);
  }
  deleteOrder(id: number) {
    return this.http.delete(this.baseUrl + 'orders/deleteOrder/' + id);
  }
  getSellerOrders(id: number,page: number,status:string) {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders/getSellerOrders/' + id +'/' +page+'/'+status);
  }
  getCustomerOrders(id: number,page: number,status:string) {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders/getCustomerOrders/' + id +'/' +page+'/'+status);
  }


  changeStatus(id: number,status:string) {
    return this.http.put(this.baseUrl + 'orders/changeStatus/' + id +'/' +status,{});
  }
  
  

}
