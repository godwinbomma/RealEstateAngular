import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeService } from '../../service/exchange.service';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.css']
})
export class CustomFieldsComponent implements OnInit {

  public Customcontactfield: any = [];
  public Customexchangefield: any = [];
  public DbExchangeListcontact: any = [];
  public DbExchangeListexchange: any = [];
  searchText: string;
  Customcontact: any = {isExchange:false,typeID:'1'};
  order: string = 'leadowner';
  isreplace: boolean = false;
  p: number = 1;
  p2: number =1;
  label: string;
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  customid: number;
  public leadData: any = [];


  constructor(private ExchangeService: ExchangeService, private toastr: ToastrService, private activated_route: ActivatedRoute) {



  }
  ngOnInit(): void {
    $(document).ready(function () {
      $(".toggle--label").click(function () {
        $(this).toggleClass("tog");
      });
    });
    this.label = 'ADD';
    this.activated_route.params.subscribe(params => {
      this.customid = Number(params['id']);
    });
    this.label = 'ADD';
    let customid = Number.isNaN(this.customid);
    if (customid != true) {
      this.label = 'UPDATE';
      //this.updateNegotiator = true;
      // this._getcustomfields_byId()
    }
    this.getcustomfields();
  }
  setvalue()
  {
this.Customcontact.isExchange=true;
  }

  getcustomfields() {
    debugger;
    this.ExchangeService._getcustomfield().subscribe((data: any) => {
      this.Customcontactfield = data.userData.contactList;
      this.Customexchangefield = data.userData.exchangeList;
      this.DbExchangeListcontact = data.userData.contactList;
      this.DbExchangeListexchange = data.userData.exchangeList;
      console.log(data);
    }, error => {

    })

  }
  ActiveInactive(id: number) {
    debugger;
    this.ExchangeService._ActiveDeactiveCustom(id).subscribe((data: any) => {
      console.log(data)
      //this.getEmployeeList();
    })
  }
  getid(customid: number) {
    debugger;
    this.customid = customid;
    this.label = 'ADD';

    if (customid != null) {
      this.label = 'UPDATE';
      //this.updateNegotiator = true;
      // this._getcustomfields_byId()
    }
    this.ExchangeService._getcustomfieldbyId(customid).subscribe((data: any) => {
      console.log(data)
      debugger;
      this.Customcontact = data['userData'];
      this.DbExchangeListcontact = data['userData'];
    })
  }

  deleteid(customid: number) {
    debugger;
    this.customid = customid;
    this.ExchangeService._deletecustomfieldbyId(customid).subscribe((data: any) => {
      console.log(data)
      debugger;
      this.toastr.success('Custom field deleted successfully');
      this.getcustomfields();
    })
  }
  addcustomcontact() {
    debugger;
if(this.Customcontact.typeID!=undefined||this.Customcontact.customFieldName!=undefined)
{
  let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
  if (this.customid == null || this.customid == undefined || isNaN(this.customid)) {

    let jsonObj = {
      "customFieldName": this.Customcontact.customFieldName,
      "typeID": +this.Customcontact.typeID,
      "alwaysVisible": true,
      "required": true,
      "showColumn": true,
      "isExchange": false,
      "isReplacement": false,
      "toolTip": this.Customcontact.toolTip,
      "helpText": "h",
      "isPublic": 1,
      "exchangeId": 0,
      "contactId": 0,
      "isActive": 1,
      "createdBy": userDetails['userId'],
      "createdOn": new Date()

    }
    this.ExchangeService.postApiCall("/api/V1/CustomFields/AddCustomField", jsonObj).subscribe((data: any) => {
      debugger;
      if (data.iSsuccessResponse == true) {
        this.toastr.success('Custom field created successfully');
        document.getElementById('add-contact-field-modal').click();
        this.Customcontact.reset();
        close();
        this.getcustomfields();
      }
      else {
        this.toastr.error(data.error);



      }


    }, (error: any) => {

    })

  }
  else {

    let jsonObj = {
      "customFieldId": this.customid,
      "customFieldName": this.Customcontact.customFieldName,
      "typeID": +this.Customcontact.typeID,
      "alwaysVisible": true,
      "required": true,
      "showColumn": true,
      "isExchange": false,
      "isReplacement": false,
      "toolTip": this.Customcontact.toolTip,
      "helpText": "h",
      "isPublic": 1,
      "exchangeId": 0,
      "isActive": 1,
      "updateBy": userDetails['userId'],
      "updateOn": new Date()


    }
    this.ExchangeService.postApiCall("/api/V1/CustomFields/UpdateCustomField", jsonObj).subscribe((data: any) => {
      debugger;
      if (data.iSsuccessResponse == true) {
        this.toastr.success('Custom field updated successfully');
        document.getElementById('add-contact-field-modal').click();
        close();
        this.Customcontact.reset();
        this.getcustomfields();
      }
      else {
        this.toastr.error(data.error);



      }


    }, (error: any) => {

    })
  }
}
else
{
  this.toastr.error("Please enter required fields");
}
   

  }

  addcustomexchange() {
    debugger;
    if(this.Customcontact.typeID!=undefined||this.Customcontact.customFieldName!=undefined)
{
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    if (this.customid != null || this.customid != undefined || isNaN(this.customid)) {
      if (this.Customcontact.isExchange == 'true') {
        this.isreplace = false;
      }
      else {
        this.isreplace = true;
      }
      let jsonObj = {
        "customFieldName": this.Customcontact.customFieldName,
        "typeID": +this.Customcontact.typeID,
        "alwaysVisible": true,
        "required": true,
        "showColumn": true,
        "isExchange": this.Customcontact.isExchange,
        "isReplacement": this.isreplace,
        "toolTip": this.Customcontact.toolTip,
        "helpText": "h",
        "isPublic": 1,
        "exchangeId": 0,
        "contactId": 0,
        "isActive": 1,
        "createdBy": userDetails['userId'],
        "createdOn": new Date()

      }
      this.ExchangeService.postApiCall("/api/V1/CustomFields/AddCustomField", jsonObj).subscribe((data: any) => {
        debugger;
        if (data.iSsuccessResponse == true) {
          this.toastr.success('Custom field created successfully');
          document.getElementById('add-ex').click();
          close();
          this.getcustomfields();
        }
        else {
          this.toastr.error(data.error);



        }


      }, (error: any) => {

      })

    }
    else {
      let jsonObj = {
        "customFieldId": this.customid,
        "customFieldName": this.Customcontact.customFieldName,
        "typeID": +this.Customcontact.typeID,
        "alwaysVisible": true,
        "required": true,
        "showColumn": true,
        "isExchange": this.Customcontact.isExchange,
        "toolTip": this.Customcontact.toolTip,
        "helpText": "h",
        "isPublic": 1,
        "exchangeId": 0,
        "contactId": 0,
        "isActive": 1,
        "updateBy": userDetails['userId'],
        "updateOn": new Date()


      }
      this.ExchangeService.postApiCall("/api/V1/CustomFields/UpdateCustomField", jsonObj).subscribe((data: any) => {
        debugger;
        if (data.iSsuccessResponse == true) {
          this.toastr.success('Custom field updated successfully');
          document.getElementById('add-ex').click();
          close();
          this.getcustomfields();
        }
        else {
          this.toastr.error(data.error);



        }


      }, (error: any) => {

      })
    }
  }
  else
  {
    this.toastr.error("Please enter required fields");
  }
  }



  onSearch(value: string) {
    debugger;
    console.log("value ", value);

    var self = this;
    // console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.Customcontactfield = self.DbExchangeListcontact.filter((a: any) => Object.keys(a).some((k: any) => {
      if (a[k]) {
        return a[k].toString().toLowerCase().indexOf(value) > -1;

      }
      else {
        return false;
      }
    }));
    this.Customexchangefield = self.DbExchangeListexchange.filter((a: any) => Object.keys(a).some((k: any) => {
      if (a[k]) {
        return a[k].toString().toLowerCase().indexOf(value) > -1;

      }
      else {
        return false;
      }
    }));

  }
  close(){
    debugger;
    this.Customcontactfield.customFieldName='';
    this.Customcontactfield.isExchange='';
    this.Customcontactfield.required='';
    this.Customcontactfield.toolTip='';
    this.Customexchangefield.customFieldName='';
    this.Customexchangefield.isExchange='';
    this.Customexchangefield.required='';
    this.Customexchangefield.toolTip='';
    
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll() {
    for (var i = 0; i < this.leadData.length; i++) {
      this.leadData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.leadData.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.leadData.length; i++) {
      if (this.leadData[i].isSelected)
        this.checkedList.push(this.leadData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }



}
