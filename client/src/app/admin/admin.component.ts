import { ProductService } from './../_services/product.service';
import { Colors, IColors, IProduct, ISizes, Product, Sizes } from './../_models/product';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { RoleService } from '../_services/role.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  UserId: Number;
  productview: boolean = true;
  productcreate: boolean = false;
  colors: IColors ={
    colorCode:"#1c03ed",
    name:"",
    quantity:0,
  };
  sizes: ISizes ={
    name:'',
    quantity:0,
  };
  
  isColor:Boolean = false;
  isSize:Boolean = false;
  
  users: Partial<User[]>;
  roles = {
    email: '',
    roles:[]
  };  
  category: any ={ };
  subcategory: any ={ };
  subsubcategory: any ={ };
  categoryes: any = [];
  subcategoryes: any = [];
  subsubcategoryes: any = [];

  div1:boolean=true;
  div2:boolean=false;
  div3:boolean=false;
  div4:boolean=false;
  div5:boolean=false;
  div6:boolean=false;
  div7:boolean=false;

  constructor(public accountService: AccountService, 
    public categoryService: CategoryService, 
    public roleService: RoleService,
    public productService: ProductService,
    private router: Router,) { 
    }

  ngOnInit(): void {
    this.getmainmenu();
    this.getsubmenu();
    this.getsubsubmenu();
    this.getUsersWithRoles();
    this.accountService.currentUser$.subscribe( x => {
      this.UserId = x.id;
    });
  }

  changeMade(){
    this.categoryService.setchangeid().subscribe(res =>{
      console.log("------------------------------------",res);
    });
  }


  createView(){
    this.productview = !this.productview;
    this.productcreate = !this.productcreate;
  }
  
  div1Function(){
    this.div1=true;
    this.div2=false;
    this.div3=false;
    this.div4=false
    this.div5=false
    this.div6=false
    this.div7=false
}

div2Function(){
    this.div2=true;
    this.div1=false;
    this.div3=false;
    this.div4=false
    this.div5=false
    this.div6=false
    this.div7=false
   
}

div3Function(){
    this.div3=true;
    this.div2=false;
    this.div1=false
    this.div4=false
    this.div5=false
    this.div6=false
    this.div7=false
}
div4Function(){
  this.div4=true
  this.div1=false
  this.div2=false;
  this.div3=false;
  this.div5=false
  this.div6=false
  this.div7=false
}
div5Function(){
  this.div5=true
  this.div1=false
  this.div2=false;
  this.div3=false;
  this.div4=false;
  this.div6=false;
  this.div7=false;
  this.router.navigate(['order', {  'sellerid': this.UserId}]);
}
div6Function(){
  this.div6=true
  this.div1=false
  this.div2=false;
  this.div3=false;
  this.div4=false
  this.div5=false
  this.div7=false
  this.router.navigate(['order', {  'customerid': this.UserId}]);
}
div7Function(){
  this.div7=true
  this.div1=false
  this.div2=false;
  this.div3=false;
  this.div4=false
  this.div5=false
  this.div6=false
}

createCategory(){
  this.categoryService.creatmenu(this.category).subscribe( res => {
    this.categoryes.push(res);
    // console.log("category----------",res);
  }),
  error => {
    console.log(error);
  };
}
createSubCategory(){
  this.categoryService.creatsubmenu(this.subcategory).subscribe( res => {
    this.subcategoryes.push(res);
    //console.log("Subcategory----------",res);
  }),
  error => {
    console.log(error);
  };
}
createSubSubCategory(){
  this.categoryService.createsubsubmenu(this.subsubcategory).subscribe( res => {
    this.subsubcategoryes.push(res);
  }),
  error => {
    console.log(error);
  };
}
getmainmenu(){
  this.categoryService.getmainmenu().subscribe( res => {
    this.categoryes = res;
    // console.log(res);
  }),
  error => {
    console.log(error);
  };
}
getsubmenu(){
  this.categoryService.getsubmenu().subscribe( res => {
    this.subcategoryes = res;
    // console.log(res);
  }),
  error => {
    console.log(error);
  };
}
getsubsubmenu(){
  this.categoryService.getsubsubmenu().subscribe( res => {
    this.subsubcategoryes = res;
    // console.log(res);
  }),
  error => {
    console.log(error);
  };
}

delete1(id:number){
  this.categoryService.delete1(id).subscribe( res => {
    // this.subsubcategoryes = res;
     //console.log(res);
  }),
  error => {
    console.log(error);
  };
}
delete2(id:number){
  this.categoryService.delete2(id).subscribe( res => {
    // this.subsubcategoryes = res;
     //console.log(res);
  }),
  error => {
    console.log(error);
  };
}
delete3(id:number){
  this.categoryService.delete3(id).subscribe( res => {
    // this.subsubcategoryes = res;
    // console.log(res);
  }),
  error => {
    console.log(error);
  };
}
getUsersWithRoles() {
  this.roleService.getUsersWithRoles().subscribe(users => {
    this.users = users;
  })
}
updateUserRoles(){
  this.roleService.updateUserRoles(this.roles.email,this.roles.roles).subscribe(res => {
     //console.log(res);
  })
}



      
}

