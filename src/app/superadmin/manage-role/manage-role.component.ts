import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import {RoleService } from 'src/app/service/role.service'
@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {

_url="http://localhost:4200";

  roles : any={

  };



roleForm:FormGroup;

  exchange: any = {
    exchangeCloseOutModel: {}
  };
  datePickerConfig = { format: 'MM/DD/YYYY' };
  privilages: any=[{}];
  constructor(
    private route: Router,
    private authService: AuthServiceService,
 private fb:FormBuilder,
 private http:HttpClient,
 private roleService:RoleService

  ) {

  }
  ngOnInit() {

var data = [
  {num:1},
  {num:1},
  {num:2},
  {num:3},
  {num:4},
  {num:5},
  {num:5}
];

var data1 = data.filter((test, index, array) =>
index === array.findIndex((findTest) =>
   findTest.num === test.num
)
);
console.log(data1);

this.privilages=[
{ moduleName :"Dashboard",isView:false,userId:0,previlesId:1,createdBy:0,isCreate: false,isDelete: false,isEdit: false,},
{ moduleName :"Exchanges",isView:false,userId:0,previlesId:2,createdBy:0,isCreate: false,isDelete: false,isEdit: false,},
{ moduleName :"Contacts",isView:false,userId:0,previlesId:3,createdBy:0,isCreate: false,isDelete: false,isEdit: false,},
{ moduleName :"Accounts",isView:false,userId:0,previlesId:4,createdBy:0,isCreate: false,isDelete: false,isEdit: false,},

  
];

   // this.getDefaultRoles(ContactTypeId);

  }

  getDefaultRoles(ContactTypeId){
this.roleService.get_role_byContactId(ContactTypeId).subscribe((res:any)=>{
  console.log("res",res);
var data=res.userData;

data.map(item => item.previlesId)
  .filter((value, index, self) => self.indexOf(value) === index)
this.privilages=data;
//alert(this.privilages.length)

},error=>{

})
  }
  






  saveRole(){

let obj= {
  "userTypeId":this.roles?.userTypeId,
  "createdBy": 0,
  "createdOn": new Date(),
 "previlegesLists": this.privilages
};

console.log(obj)
this.roleService._add_role(obj).subscribe(res=>{
if(res){

}
},error=>{

})
  }  

  updateRole(){

let obj= {
"userTypeId":this.roles?.userTypeId,
"createdBy": 0,
"createdOn": new Date(),

"previlegesLists": this.privilages
};

this.roleService.update_role(obj).subscribe(res=>{
if(res){

}
},error=>{

})
  }


}
