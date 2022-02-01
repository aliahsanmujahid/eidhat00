import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/_services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
 
  noFav = true;
  products: any = [];

  
  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.noFav = null;
    this.favoriteService.getfavProducts().subscribe( res =>{
      this.products = res;
      //console.log(this.products);
      if(this.products.length === 0){
        this.noFav = true;
      }else{
        this.noFav = false;
      }
    }),
    error => {
      console.log(error);
    };
}
  


}
