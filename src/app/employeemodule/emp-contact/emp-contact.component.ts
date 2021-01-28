import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import{ ExchangeService} from '../../service/exchange.service';
import { ContactService } from '../../service/contact.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-emp-contact',
  templateUrl: './emp-contact.component.html',
  styleUrls: ['./emp-contact.component.css']
})
export class EmpContactComponent implements OnInit {
  dropdownList: any = [
    
  ];
    selectedItems: any = [  ];
    selectedItemsval: any = [  ];
    isEdit: boolean = false;
    dropdownSettings = {};
    public ExchangeList: any = [];
    public DbExchangeList: any = [];
    columnheaderlist :any=[];
    columnheadervaluelist :any=[];
    searchText: string;
    order: string = 'leadowner';
    p: number = 0;
    reverse: boolean = false;
    public leadData: any = [];
    public selectedItemsvalue:any;
    masterSelected: boolean;
    checkedList: any;
  contactListArray: any = [];
  SearchText: string = '';
  userTypeId: string = "3";
  userDetails: any = [];
  Datetype:any={};
  DateValue:Date;
  datePickerConfig = { format: 'MM/DD/YYYY' };
  constructor(
    private route: Router,
    private authService: AuthServiceService,
    private contactservice: ContactService,
    private ExchangeService: ExchangeService,
    private datePipe: DatePipe
   
  ) {
    
  }
  ngOnInit(): void {
    this.selectedItems = [];
    this.dropdownSettings = { 
              singleSelection: false, 
              text:"Select Column",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class"
            }; 
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getContactList();
    this.getcustomizecolumn();
   
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll(){
 
  }
  isAllSelected(){
  
  }
  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.contactListArray = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
  }

  getCheckedItemList(){
   
  }

  getContactList() {

    this.contactservice._getContacts(+this.userDetails['userId']).subscribe((success: any) =>  {
      debugger;
      //this.authService.postApiCall("Contacts/ContactList?UserId=" + userDetails['userId'], jsonObj).subscribe(success => {
      this.contactListArray = success['userData'];
      this.DbExchangeList=success['userData'];
    }, error => {

    })
  }
  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
getcustomizecolumn() {
  debugger;
  this.ExchangeService._getcontactcustomizecolumn().subscribe((data: any)=> {

  var data:any=data.userData.exchangeColumnList;
    console.log("dropdwon1",data);
    data.forEach((item:string,i:number)=>{
      var obj:any={
        id:i+1,
        itemName:item
      }
      console.log("item",item);
     this.dropdownList.push(obj);
   })

    console.log("customizecolumn",  this.dropdownList);
  //  console.log("customizecolumnlist", data.userData.exchangeColumnList);
    }, error => {

    })
  
}
onDeSelectAll(items: any){
  console.log(items);
}
changethetextcase(text:string)
{
return text.charAt(0).toLowerCase() + text.slice(1)
}

isEditOrCancelRel() {
  var self = this;
  
}
  selectedcustomItems(){
    var selectedValues:any=this.selectedItems;
    console.log("dropdwon1",selectedValues);
    this.selectedItemsval = [];
    selectedValues.forEach((item:any)=>{  
      this.selectedItemsval.push(item.itemName);
     });
     this.selectedItemsvalue = this.selectedItemsval;
     this.selectedItemsvalue = this.selectedItemsval.toString();
     this.ExchangeService._getcustomizecontactcolumndata(this.selectedItemsvalue).subscribe((success:any) => {
       debugger;
       var self = this;
       self.isEdit = true;
       console.log('response ==>selectedcustomItems',success);
       this.columnheaderlist=success['userData']['exchangeColumnList'];
       this.columnheadervaluelist=success['userData']['contactColumnListData'];
       document.getElementById('bank_profile-col').click();
       //this.columnheadervaluelist=[...success['userData']['exchangeColumnListData'], ...success['userData']['templateCustomFieldColumnListData']];
       console.log('this.columnheadervaluelist', this.columnheadervaluelist)
   
   }, error => {
   
   })
     
     console.log("selecteditems",this.selectedItemsval);
   }

   Getdateval(Dateid:number)
   {
     debugger;
    if (Dateid==1)
    {
        this.Datetype.Fromdate=this.datePipe.transform(new Date(), 'MM/dd/yyyy');
        this.Datetype.Todate=this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    }
    else if(Dateid==2)
    {
      this.DateValue=this.addDays(new Date,-1)
      this.Datetype.Fromdate=this.datePipe.transform(this.DateValue, 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(this.DateValue, 'MM/dd/yyyy');
    }
    else if(Dateid==3)
    {
      this.DateValue=new Date;
      this.Datetype.Fromdate=this.datePipe.transform(new Date(this.DateValue.getFullYear(), this.DateValue.getMonth(), 1), 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    }
    else if(Dateid==4)
    {
      this.DateValue=this.addDays(new Date,-31)
      this.Datetype.Fromdate=this.datePipe.transform(new Date(this.DateValue.getFullYear(), this.DateValue.getMonth(), 1), 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(new Date(this.DateValue.getFullYear(), this.DateValue.getMonth()+1, 0), 'MM/dd/yyyy');
    }
    else if(Dateid==5)
    {
      this.DateValue=new Date();
      this.Datetype.Fromdate=this.datePipe.transform(new Date(this.DateValue.getFullYear(), 0, 1), 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    }
    else if(Dateid==6)
    {
      this.DateValue=this.addDays(new Date,-365)
      this.Datetype.Fromdate=this.datePipe.transform(new Date(this.DateValue.getFullYear(), 0, 1), 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(new Date(this.DateValue.getFullYear()+1, 0, 0), 'MM/dd/yyyy');
    }
    else if(Dateid==7)
    {
      this.DateValue=this.addDays(new Date,-365)
      this.Datetype.Fromdate=this.datePipe.transform( new Date(this.Datetype.Fromdate), 'MM/dd/yyyy');
      this.Datetype.Todate=this.datePipe.transform(new Date (this.Datetype.Todate), 'MM/dd/yyyy');
    }
    let jsonObj = {
      "FromDate": this.Datetype.Fromdate,
      "ToDate": this.Datetype.Todate,
     // "ipAddress":this.ipAddress
    }
      this.authService.postApiCall("/api/V1/Contacts/SearchContactByDate", jsonObj).subscribe((data:any) => {
        console.log(data);
        this.contactListArray = data['userData'];
        this.DbExchangeList=data['userData'];
      },(err:any) => {
        debugger;
       
        
      })
    
   }

   addDays(theDate:Date, days:number) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

}
