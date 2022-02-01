import { ProductService } from 'src/app/_services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  products: any = [];

  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
      this.productService.getuserProducts().subscribe( res =>{
        this.products = res;
      }),
      error => {
        console.log(error);
      };

  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe( res =>{
      this.products.splice(this.products.findIndex(m => m.id === id), 1);
      console.log("deleted");
    }),
    error => {
      console.log(error);
    };
  }



}
