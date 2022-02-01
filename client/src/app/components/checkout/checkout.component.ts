import { OrderService } from './../../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotals } from 'src/app/_models/basket';
import { IOrder, IOrderItem } from 'src/app/_models/order';
import { BasketService } from 'src/app/_services/basket.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  UserId: Number;
  ordersucces = false;
  alert = false;
  bkashpay = false;
  rocketpay = false;
  nagadpay = false;
  cashondelevarypay = false;

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;
  

  orderCreate: IOrder = {
    name: '',
    phone: '',
    address: '',
    district: '',
    upazila: '',
    cashOnDelevary:'',
    bkash: '',
    bkashTransactionID: '',
    rocket: '',
    rocketTransactionID: '',
    nagad: '',
    nagadTransactionID: '',
    seller_id:0,
    orderItemDto:[]
  }
  
  
  constructor(public accountService: AccountService,public basketService: BasketService,
    public orderService: OrderService,private router: Router) { }

  ngOnInit(): void {
    
      
      if(!localStorage.getItem('basket_id')){
        this.router.navigateByUrl('');
      }else{
        this.basketService.getBasket();
        this.basket$ = this.basketService.basket$;
        this.basketTotal$ = this.basketService.basketTotal$;
        this.setOrderItems();

        this.accountService.currentUser$.subscribe( x => {
          this.UserId = x.id;
        });
      }
    
    
  }
  hidealert(){
    this.alert = !this.alert;
  }
  vieworder(){
    this.router.navigate(['order', {  'customerid': this.UserId}]);
  }
  
  setOrderItems(){
    const items = JSON.parse(localStorage.getItem('basket_id'));
    
    items.items.forEach(item =>{
       
     const OrderItem: IOrderItem ={
        id: 0,
        productName: '',
        price: 0,
        quantity: 0,
        color_id:0,
        color_name:'',
        size_id:0,
        size_name:'',
      }
      //console.log(item);

      OrderItem.id = item.id;
      OrderItem.productName = item.productName;
      OrderItem.price = item.price;
      OrderItem.quantity = item.quantity;
      if(item.color.length !== 0){
      //console.log("Color Ace");
      OrderItem.color_id = item.color[0].id;
      OrderItem.color_name = item.color[0].name;
      }
      if(item.size.length !== 0){
        OrderItem.size_id = item.size[0].id;
        OrderItem.size_name = item.size[0].name;
      //console.log("Size Ace");
      }

      //console.log(OrderItem);
  
      
      this.orderCreate.orderItemDto.push(OrderItem);
      
      
     
    });
    this.orderCreate.seller_id = items.shopId;
    //console.log(this.orderCreate);
    
    
  }

  cashondelevary(){
    this.orderCreate.cashOnDelevary = "CashOnDelevary"
    this.cashondelevarypay = true;
    this.bkashpay = false;
    this.nagadpay = false;
    this.rocketpay =false;
    this.alert =false;
    this.orderCreate.bkash = '',
    this.orderCreate.bkashTransactionID = '',
    this.orderCreate.nagad = '',
    this.orderCreate.nagadTransactionID = '',
    this.orderCreate.rocket = '',
    this.orderCreate.rocketTransactionID = ''
  }
  bkash(){
    this.bkashpay = true;
    this.nagadpay = false;
    this.rocketpay =false;
    this.cashondelevarypay = false;
    this.orderCreate.bkash = '',
    this.orderCreate.bkashTransactionID = '',
    this.orderCreate.nagad = '',
    this.orderCreate.nagadTransactionID = '',
    this.alert =false;
    this.orderCreate.rocket = '',
    this.orderCreate.rocketTransactionID = ''

  }
  rocket(){
    this.bkashpay = false;
    this.nagadpay = false;
    this.rocketpay =true;
    this.cashondelevarypay = false;
    this.alert =false;
    this.orderCreate.bkash = '',
    this.orderCreate.bkashTransactionID = '',
    this.orderCreate.nagad = '',
    this.orderCreate.nagadTransactionID = '',
    this.orderCreate.rocket = '',
    this.orderCreate.rocketTransactionID = ''
  }
  nagad(){
    this.bkashpay = false;
    this.nagadpay = true;
    this.rocketpay =false;
    this.cashondelevarypay = false;
    this.alert =false;
    this.orderCreate.bkash = '',
    this.orderCreate.bkashTransactionID = '',
    this.orderCreate.nagad = '',
    this.orderCreate.nagadTransactionID = '',
    this.orderCreate.rocket = '',
    this.orderCreate.rocketTransactionID = ''
  }

  order(){
    console.log("EEEEEEEEEE");
    if(
      this.orderCreate.cashOnDelevary == '' && 
      this.orderCreate.rocket == ''&& this.orderCreate.rocketTransactionID == '' &&
      this.orderCreate.bkash == '' && this.orderCreate.bkashTransactionID == '' && 
      this.orderCreate.nagad == '' && this.orderCreate.nagad == '' ){
         this.alert = true;
    }else{
      console.log("------------",this.orderCreate);
      this.orderService.orderCreate(this.orderCreate).subscribe(res =>{
      console.log(res);
      this.basketService.deleteBasket();
      this.ordersucces = true;
    })
    }


  
  }

}
