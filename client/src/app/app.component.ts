import { OrderService } from './_services/order.service';
import { IBasket, IBasketItem, IBasketTotals } from './_models/basket';
import { CategoryService } from './_services/category.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Model } from './_models/model';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from './_services/basket.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  changeId :number;
  UserId: Number;

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;
  alert = false;
  auth2: any;
  search:string;
  baseUrl = environment.apiUrl;
  category: any = [];
  subcategory: any = [];
  subsubcategory: any = [];
  model: Model ={
    username:'',
    email:'',
    image:''
  };

  constructor(private socialAuthService: SocialAuthService,public accountService: AccountService,public categoryService: CategoryService,
    private router: Router,public basketService: BasketService,public orderService: OrderService) { }

  ngOnInit(): void {

    this.categoryService.getchangeid().subscribe( res =>{
      this.changeId = res;
      const cid = JSON.parse(localStorage.getItem('changeid'));
      if(!cid){
      localStorage.setItem('changeid', JSON.stringify(this.changeId));
      }
      else{
        if(this.changeId !== cid){
         localStorage.removeItem('changeid');
         localStorage.removeItem('eidhatcategory');
         localStorage.removeItem('eidhatsubcategory');
         localStorage.removeItem('eidhatsubsubcategory');
        }
      }

    })

    this.accountService.currentUser$.subscribe( x => {
      this.UserId = x.id;
    });
   

    this.QuantityCheck();
    this.setCurrentUser();
    this.basketService.getBasket();
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
    this.getCategoryes();
    
  }

  goprofilemobile(){
    this.router.navigateByUrl('profile');
    this.alert = !this.alert;
  }
  goadmin(){
    this.router.navigateByUrl('admin');
    this.alert = !this.alert;
  }
  customerorders(){
    this.router.navigate(['order', {  'customerid': this.UserId}]);
  }
  customerordersmobile(){
    this.router.navigate(['order', {  'customerid': this.UserId}]);
    this.alert = !this.alert;
  }
  alerttoggle(){
    this.alert = ! this.alert;
  }
  QuantityCheck(){
    const items = JSON.parse(localStorage.getItem('basket_id'));
    if(items){
   
    this.orderService.orderQuantityCheck(items.items).subscribe(res =>{
     
      //console.log("----------------------",res);

    })
    }
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }
  
  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('eidhatuser'));
    if(user){
      this.accountService.setUser(user);
    }
  }

 

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
        this.model.username =  user.name;
        this.model.email =  user.email;
        this.model.image =  user.photoUrl;

        this.login();
    });
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  logout() {
    this.accountService.logout();
  }



  getCategoryes(){
    const cate = JSON.parse(localStorage.getItem('eidhatcategory'));
    if(cate){
      console.log("cate getting from local");
      this.category = cate;
    }else{
      this.categoryService.getCategories().subscribe( res => {
        this.category = res;
        localStorage.setItem('eidhatcategory', JSON.stringify(res));
        console.log(this.category );
      })
    }
  }




  getCatProduct(cate: number){
    this.router.navigate(['shop', {  'cate':cate }]);
  
  }
  getsubCatProduct(subcate: number){
    this.router.navigate(['shop', { 'subcate':subcate }]);
  }
  searchProduct(){
    this.router.navigate(['shop', { 'search':this.search }]);
  }



 
  
}
