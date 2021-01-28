import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import{ ExchangeService} from '../../../service/exchange.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ContactService } from '../../../service/contact.service';
import { DatePipe } from '@angular/common';
import { AuthServiceService } from 'src/app/service/auth-service.service';



@Component({
  selector: 'app-manage-exchanges-list',
  templateUrl: './manage-exchanges-list.component.html',
  styleUrls: ['./manage-exchanges-list.component.css'],
//  encapsulation: ViewEncapsulation.None
})
export class ManageExchangesListComponent implements OnInit {
 addContactForm:FormGroup;
 Contacts: any = {userTypeId:3,TwofactorConfig :2};
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
  closeResult: string;
  ContactsCF: any=[];
  Datetype:any={};
  DateValue:Date;
  datePickerConfig = { format: 'MM/DD/YYYY' };
  constructor(private ExchangeService: ExchangeService,
    private modalService: NgbModal,private formBuilder:FormBuilder,
    public contactservice:ContactService, private datePipe: DatePipe,private authService: AuthServiceService,
    ) {
 }

ngOnInit(): void {
 
  this.addContactForm = this.formBuilder.group({
    "userTypeId": ['', Validators.required],
    "firstName": ['', Validators.required],
    "lastName": ['', Validators.required],
    "emailAddress": ['', Validators.required],
    "mobileNumber": ['', Validators.required],
    "officeNumber": ['', Validators.required],
    "faxNumber": ['', Validators.required],
    "address": ['', Validators.required],
    "notes": ['', Validators.required]
   })
  
console.log("dropdwon",this.dropdownList);
this.selectedItems = [];
this.dropdownSettings = { 
          singleSelection: false, 
          text:"Select Column",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };            
    this.getExchangeList();
    this.getcustomizecolumn();
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

isEditOrCancelRel() {
  var self = this;  
}

selectedcustomItems(){
 // debugger;
 var selectedValues:any=this.selectedItems;
 console.log("dropdwon1",selectedValues);
   this.selectedItemsval = [];
 selectedValues.forEach((item:any)=>{  

   this.selectedItemsval.push(item.itemName);
});
  this.selectedItemsvalue = this.selectedItemsval
  this.selectedItemsvalue =this.selectedItemsval.toString();
  this.ExchangeService._getcustomizecolumndata(this.selectedItemsvalue).subscribe((success:any) => {
    var self = this;
    
    self.isEdit = true;
    console.log('response ==>selectedcustomItems',success);
    this.columnheaderlist=success['userData']['exchangeColumnList'];
    this.columnheadervaluelist=success['userData']['exchangeColumnListData'];
    document.getElementById('bank_profile-col').click();
    console.log('this.columnheadervaluelist', this.columnheadervaluelist)

}, error => {
})
  
  console.log("selecteditems",this.selectedItemsval);
}

onDeSelectAll(items: any){
    console.log(items);
}

changethetextcase(text:string)
{
return text.charAt(0).toLowerCase() + text.slice(1)
}

getExchangeList() {
    this.ExchangeService._getExchanges().subscribe((data: any)=> {
      this.ExchangeList = data.userData;
      this.DbExchangeList = data.userData;
      console.log(data);
      }, error => {
  
      })
    
  }

getcustomizecolumn() {
    this.ExchangeService._getcustomizecolumn().subscribe((data: any)=> {

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

      console.log("customizecolumn", data.userData);
     // console.log("customizecolumnlist", data.userData.exchangeColumnList);
      }, error => {
  
      })
    
  }
  onSearch(value: string){
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.ExchangeList = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
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

  getUserData(cId:number,modalPopup:any){
   
   this._getContactdetails_byId(cId)
   this.openModal(modalPopup);
  }

  _getContactdetails_byId(ContactId: number) {
    this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
      console.log(data);
      
      //debugger;
      this.Contacts = data['userData'];
     this.ContactsCF=data['userData']['cfTransationsModel_'];
  
     
    })
  }


  openModal(modal) {
    this.modalService.open(modal,{size: 'xl', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
     this.authService.postApiCall("/api/V1/Exchange/ExcelDownload", jsonObj).subscribe((data:any) => {
       console.log(data);
       this.ExchangeList = data['userData'];
       this.DbExchangeList=data['userData'];
     },(err:any) => {
       debugger;
      
       
     })
   
  }

  addDays(theDate:Date, days:number) {
   return new Date(theDate.getTime() + days*24*60*60*1000);
}

}
