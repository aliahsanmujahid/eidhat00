import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category: any = [];
  subcategory: any = [];
  subsubcategory: any = [];

  constructor(public categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategoryes();
    this.getsubCategoryes();
    this.getsubsubCategoryes();
  }

  getsubCategoryes(){
    const cate = JSON.parse(localStorage.getItem('eidhatsubcategory'));
    if(cate){
      console.log("subcate getting from local");
      this.subcategory = cate;
    }else{
      this.categoryService.getsubmenu().subscribe( res => {
        this.subcategory = res;
        localStorage.setItem('eidhatsubcategory', JSON.stringify(res));
        console.log("sub ",this.subcategory );
      })
    }
  }
  getsubsubCategoryes(){
    const cate = JSON.parse(localStorage.getItem('eidhatsubsubcategory'));
    if(cate){
      console.log("subsubcate getting from local");
      this.subsubcategory = cate;
    }else{
      this.categoryService.getsubsubmenu().subscribe( res => {
        this.subsubcategory = res;
        localStorage.setItem('eidhatsubsubcategory', JSON.stringify(res));
        console.log("subsub cate",this.subsubcategory );
      })
    }
  }
  getsubCatProduct(subcate: number){
    this.router.navigate(['shop', { 'subcate':subcate }]);
  }

  getCategoryes(){
    
    const cate = JSON.parse(localStorage.getItem('eidhatcategory'));
    if(cate){
      console.log("cate getting from local2");
      this.category = cate;
    }else{
      this.categoryService.getCategories().subscribe( res => {
        this.category = res;
        localStorage.setItem('eidhatcategory', JSON.stringify(res));
        console.log("cate",this.category );
      })
    }
  }
}
