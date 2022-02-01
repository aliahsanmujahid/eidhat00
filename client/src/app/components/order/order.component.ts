import { OrderService } from './../../_services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  noorder = false;
  throttle = 0;
  distance = 1;
  page:number = 1;
  orderview  = false;
  search:string;

  orders = [];
  singleorder = [];
  sellerid: number;
  customerid: number;
  status="Pending";

  constructor(private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
         if(params.sellerid){
          this.sellerid = params.sellerid;
          this.getorders();
         }
         if(params.customerid){
          this.customerid = params.customerid;
          this.getorders();
         }
        //  console.log(params);
         this.orders = null;
       
     });
  }

  viewOrder(id:number){
    console.log("-----------id",id);
    this.singleorder  = this.orders.filter(i => i.id == id);
    console.log(this.singleorder);
    this.orderview = true;
  }
  deleteOrder(id:number){

    this.orderService.deleteOrder(id).subscribe( res=>{
      this.orders.splice(this.orders.findIndex(m => m.id === id), 1);
      console.log("----------Deleted--------");
    });

  }


  getOrdersByStatus(status:string){
    this.status = status;
    this.orderview = false;
    this.getorders();
  }
  
  changeStatus(id:number,status:string){
   this.orderService.changeStatus(id,status).subscribe(res => {
      console.log("Approved",res);
   });
  }
  SearchOrder(){
    this.orders = [];
    this.noorder = false;
    this.orderview = false;
    this.orderService.getOrderById(this.search).subscribe(res =>{
      this.orders.push(res);
      console.log("search order---------",res);
    });

  }


  getorders(){
    this.page =1;
    this.orders = null;
    this.noorder = false;
    if(this.sellerid){
      console.log("Page--------",this.page);
      console.log("seller id-----------",this.sellerid);
      console.log("status-----------",this.status);
       this.orderService.getSellerOrders(this.sellerid,this.page,this.status).subscribe(res =>{
         this.orders  = res;
         console.log(res);
         if(this.orders.length === 0){
          this.noorder = true;
        }else{
          this.noorder = false;
        }
       });
    }
    if(this.customerid){
      console.log("Page--------",this.page);
      console.log("customer id-----------",this.customerid);
      console.log("status-----------",this.status);

       this.orderService.getCustomerOrders(this.customerid,this.page,this.status).subscribe(res =>{
         this.orders  = res;
         console.log("res-------",res);
         if(this.orders.length === 0){
          this.noorder = true;
         }
       });

    }
  }

  
  onScroll(): void {
    this.noorder = false;
    
    if(this.sellerid){
      this.orderService.getSellerOrders(this.sellerid,++this.page,this.status).subscribe( res => {
        //console.log("res",res);
        console.log("Page--------",this.page);
        this.orders.push(...res);
        if(res.length === 0){
          this.noorder = true;
        }
       
       });
    }
    if(this.customerid){
      this.orderService.getSellerOrders(this.customerid,++this.page,this.status).subscribe( res => {
        //console.log("res",res);
        console.log("Page--------",this.page);
        this.orders.push(...res);
        if(res.length === 0){
          this.noorder = true;
        }else{
          this.noorder = false;
        }
       
       });
    }

    }
  

}
