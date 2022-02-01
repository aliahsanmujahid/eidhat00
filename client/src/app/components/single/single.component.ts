import { FavoriteService } from './../../_services/favorite.service';
import { ProductService } from './../../_services/product.service';
import { BasketService } from './../../_services/basket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  fav = false;
  alert = false;
  error = false;
  product: Product;
  UserId: Number;
  cartProduct: Product = {
    id: 0,
    appUserId:0,
    name: '',
    description: '',
    highLights: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    price: 0,
    discPrice: 0,
    quantity: 0,
    colors : [],
    sizes : []
  };

  
  constructor(private route: ActivatedRoute,private basketService: BasketService,
    private favoriteService: FavoriteService,public accountService: AccountService ) { }


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe( x => {
      this.UserId = x.id;
    });

    this.route.data.subscribe(data => {
      // console.log(data.product);
      this.product = data.product;
      // console.log("pppppppppppp--",this.product);
    })
    this.cartProduct = {
    id: this.product.id,
    appUserId: this.product.appUserId,
    name: this.product.name,
    description: this.product.description,
    highLights: this.product.highLights,
    image1: this.product.image1,
    image2: this.product.image1,
    image3: this.product.image1,
    image4: this.product.image1,
    price: this.product.price,
    discPrice: this.product.discPrice,
    quantity: this.product.quantity,
    colors : [],
    sizes : [],
    };
    
    // this.favoriteService.isFavorited(this.product.id).subscribe(res => {
    //   this.fav = res;
    //   //console.log(this.fav);
    // });

  }

  hidealert(){
    this.alert = !this.alert;
  }

  setSize(size, $event){
    if ($event.target.checked){
      this.cartProduct.sizes = [];
      //console.log(size);
      this.cartProduct.sizes.push(size);
      this.alert = false;
     // console.log(this.cartProduct);
    }
    else {
      const index = this.cartProduct.sizes.indexOf(size);
      this.cartProduct.sizes.splice(index, 1);
      
      //console.log(this.cartProduct);
    }
    // console.log(this.cartProduct);
  }
  setColor(color, $event){
    if ($event.target.checked){
      this.cartProduct.colors = [];
      // console.log(color);
      this.cartProduct.colors.push(color);
      this.alert = false;
     // console.log(this.cartProduct);
    }
    else {
      const index = this.cartProduct.colors.indexOf(color);
      this.cartProduct.colors.splice(index, 1);
      //console.log(this.cartProduct);
    }
    // console.log(this.cartProduct);
  }
  addItemToBasket(){
    // if(this.product.appUserId === this.UserId){
    //   console.log("You Can Not Buy Your Own Product",this.UserId);
    // }else{
    if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
     if(this.product.colors.length !== 0 && this.cartProduct.colors.length === 0){
       //console.log("Select Color");
       this.alert = !this.alert;
     }
     else if(this.product.sizes.length !== 0 && this.cartProduct.sizes.length === 0){
      //console.log("Select Size");
      this.alert = !this.alert;
    }else{
      //console.log("cartProduct",this.cartProduct);
      this.basketService.addItemToBasket(this.cartProduct);
     }
    }else{
     // console.log("cartProduct",this.cartProduct);
      this.basketService.addItemToBasket(this.cartProduct);
    }
  //}
  }
  // addFav(id: number){
  //   this.favoriteService.addFav(id).subscribe(res =>{
  //     //console.log(res);
  //     this.fav = true;
  //   });

  // }
  // removeFav(id: number){
  //   this.favoriteService.removeFav(id).subscribe(res =>{
  //     //console.log(res);
  //     this.fav = false;
  //   });
  // }

}
