import { AccountService } from './../_services/account.service';
import { ProductService } from './../_services/product.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BasketService } from '../_services/basket.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  throttle = 0;
  distance = 1;
  page:number = 1;

  noproduct:boolean = false;
  baseUrl = environment.apiUrl;
  products=[];
  currentRoute: string;
  UserId: Number;
  params: any = {};

  

  constructor(private productService: ProductService,
              private route: ActivatedRoute,public accountService: AccountService,
              private router: Router, private basketService: BasketService) { 
              this.products = null;
  }
  
  ngOnInit(): void {
    this.products = null;
    //console.log("nulling product----------");
    //console.log("products----------",this.products);

    this.route.params.subscribe(params => {
      // console.log("---------------",this.search);
     // Object.keys(this.search).length === 0 && this.search.constructor === Object
       if (Object.keys(params).length === 0) {
         this.products = null;
         this.getProducts();
         //console.log("geting product----------",this.products);
         //console.log("params null");
       }else{
         this.params = params;
         //console.log("params--------",this.params);
         this.products = null;
         this.paramsproducts(this.params);
       }
       
     });
    this.accountService.currentUser$.subscribe( x => {
      this.UserId = x.id;
    });
  }
  addItemToBasket(item: Product) {
    // if(item.appUserId === this.UserId){
    //   console.log("You Can Not Buy Your Own Product",this.UserId);
    // }else{
    //   this.basketService.addItemToBasket(item);
    // }
    //console.log("item---",item);
    this.basketService.addItemToBasket(item);
  }
  isinBasket(id: number){
    if(this.basketService.getCurrentBasketValue()){
      if(this.basketService.getCurrentBasketValue().items.find(i => i.id == id)){
        return true;
      }else{
        return false; 
      }
    }
  }
  getProducts(){
    this.page = 1;
    this.products = null;
    this.productService.getProducts(this.page).subscribe( res =>{
      this.products = null;
      this.products = res;
     //console.log("geted product",this.products);
     if(this.products.length === 0){
      this.noproduct = true;
    }else{
      this.noproduct = false;
    }
    }),
    error => {
      console.log(error);
    };
  }
  onScroll(): void {
    if(this.params.cate){
       //console.log("params cate---------------", this.params);
    }else if(this.params.subcate){
     // console.log("params subcate---------------", this.params);
    }else{
      //console.log("page",++this.page);
    //this.page = this.page++;
    //console.log("page",this.page);
    this.productService
      .getProducts(++this.page).subscribe( res => {
       //console.log("res",res);
       this.products.push(...res);
       if(res.length === 0){
        this.noproduct = true;
      }else{
        this.noproduct = false;
      }
       //this.products = res;
      });
    }
  }
  paramsproducts(params){
  if(params.cate){
    this.productService.getcateProducts(params.cate).subscribe( res =>{
      this.products = res;
     //console.log("cate-----",this.products);
     if(this.products.length === 0){
      this.noproduct = true;
    }else{
      this.noproduct = false;
    }
    }),
    error => {
      console.log(error);
    };
  }
  if(params.subcate){
    this.productService.getsubcateProducts(params.subcate).subscribe( res =>{
      this.products = res;
     //console.log("subCate----",this.products);
     if(this.products.length === 0){
      this.noproduct = true;
    }else{
      this.noproduct = false;
    }
    }),
    error => {
      console.log(error);
    };
  }
  if(params.search){
    // console.log("searching.............",params.search.toLowerCase());
    this.productService.searchProducts(params.search).subscribe( res =>{
      this.products = res;
      //console.log("searching response----",res);
     if(this.products.length === 0){
      this.noproduct = true;
    }else{
      this.noproduct = false;
    }
    }),
    error => {
      console.log(error);
    };
  }
   
  }


}
