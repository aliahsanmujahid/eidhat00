import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct, Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  // mainproductCache = new Map();
  // mainproductCachetwo = new Map();
  newproduct = [];
  
  
  productCache = new Map();
  constructor(private http: HttpClient,private router: Router) { }


  createProduct(product: IProduct){
    return this.http.post<IProduct>(this.baseUrl + 'Product/create', product);
  }
  getProduct(id: string) {
    const product = [...this.productCache.values()]
    .reduce((arr, elem) => arr.concat(elem), [])
    .find((product: Product) => product.id === Number(id));

  if (product) {
    console.log("returning product");
    return of(product);
  }

  return this.http.get<Product>(this.baseUrl + 'Product/' + Number(id));
  }
  
  getProducts(page:number){

    var response = this.productCache.get(page);
    
    if(page == 1 && response){
      
      this.newproduct = [];
      for (var i = 0; i < 12; i++) {

        this.newproduct.push(response[i]);
      }
      // console.log("new post",this.newproduct);
     
      return of(this.newproduct);
    }
    if (response) {
      return of(response);
    }else{
      return this.http.get<Product[]>(this.baseUrl + 'product/getProducts/'+page).pipe(map(response => {
        
          this.productCache.set(page, response);

          return this.productCache.get(page);
        
      }))
    }

   

 }


  getuserProducts(){
     var response = this.productCache.get(Object.values('[userProducts]').join('-'));
    if (response) {
     // console.log("Products-Catching--",this.productCache);
      return of(response);
    }
    return this.http.get<Product[]>(this.baseUrl + 'product/getUserProducts/').pipe(map(response => {
      this.productCache.set(Object.values('[userProducts]').join('-'), response);
      //console.log(this.productCache);
      return response;
    }))
  }
  getfavProducts(){
    var response = this.productCache.get(Object.values('[userProducts]').join('-'));
   if (response) {
    // console.log("Products-Catching--",this.productCache);
     return of(response);
   }
   return this.http.get<Product[]>(this.baseUrl + 'product/getFavProducts/').pipe(map(response => {
     this.productCache.set(Object.values('[userProducts]').join('-'), response);
     //console.log(this.productCache);
     return response;
   }))
 }
 deleteProduct(id:number){
  return this.http.delete(this.baseUrl + 'product/deleteproduct/'+id);
 }
 updateproduct(id:number,product: IProduct){
  return this.http.put(this.baseUrl + 'product/updateproduct/'+id,product);
 }









 getcateProducts(id: number){
  var response = this.productCache.get(Object.values(['cate'+id]).join('-'));
 if (response) {
  // console.log("Products-Catching--",this.productCache);
   return of(response);
 }
 return this.http.get<Product[]>(this.baseUrl + 'product/getCateProduct/' + id).pipe(map(response => {
   this.productCache.set(Object.values(['cate'+id]).join('-'), response);
   //console.log(this.productCache);
   return response;
 }))
}

getsubcateProducts(id: number){
  var response = this.productCache.get(Object.values(['subcate'+id]).join('-'));
 if (response) {
  //console.log("Products-Catching--",this.productCache);
   return of(response);
 }
 return this.http.get<Product[]>(this.baseUrl + 'product/getsubCateProduct/' + id).pipe(map(response => {
   this.productCache.set(Object.values(['subcate'+id]).join('-'), response);
   //console.log(this.productCache);
   return response;
 }))
}
getsubsubcateProducts(id: number){
  var response = this.productCache.get(Object.values('[catesubsubProducts]').join('-'));
 if (response) {
  // console.log("Products-Catching--",this.productCache);
   return of(response);
 }
 return this.http.get<Product[]>(this.baseUrl + 'product/getsubsubCateProduct/' + id).pipe(map(response => {
   this.productCache.set(Object.values('[catesubsubProducts]').join('-'), response);
   //console.log(this.productCache);
   return response;
 }))
}
searchProducts(text: string){
  var response = this.productCache.get(Object.values(['searchProducts'+text]).join('-'));
 if (response) {
  // console.log("Products-Catching--",this.productCache);
   return of(response);
 }
 return this.http.get<Product[]>(this.baseUrl + 'product/searchProduct/' + text).pipe(map(response => {
   this.productCache.set(Object.values(['searchProducts'+text]).join('-'), response);
   //console.log(this.productCache);
   return response;
 }))
}



}
