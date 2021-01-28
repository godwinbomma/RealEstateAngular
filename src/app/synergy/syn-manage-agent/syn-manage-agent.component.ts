import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import{ ExchangeService} from '../../service/exchange.service';
import { ContactService } from '../../service/contact.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-syn-manage-agent',
  templateUrl: './syn-manage-agent.component.html',
  styleUrls: ['./syn-manage-agent.component.css']
})
export class SynManageAgentComponent implements OnInit {
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
    private datePipe: DatePipe,
    private toastr: ToastrService 
   
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
    this.getagenttList();
    //this.getcustomizecolumn();
   
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

  getagenttList() {
debugger;
    this.contactservice._getlinkedAgents(+this.userDetails['userId']).subscribe((success: any) =>  {
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

approvecontact(contactid:number,status:string) {
  debugger;
   
    this.ExchangeService._approvecontact(contactid,this.userDetails['userId'],status).subscribe((success:any)=> {
      debugger;
      if(status=="Active")
      {
        this.toastr.success('Contact Approved');
      }
      else
      {
        this.toastr.success('Contact Rejected');
      }
     
      this.getagenttList();
    }, error => {

    })
  }

}

