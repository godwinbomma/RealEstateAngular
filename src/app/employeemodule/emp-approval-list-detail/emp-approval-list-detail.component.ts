import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeService } from '../../service/exchange.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-approval-list-detail',
  templateUrl: './emp-approval-list-detail.component.html',
  styleUrls: ['./emp-approval-list-detail.component.css']
})
export class EmpApprovalListDetailComponent implements OnInit {

  public ExchangeApproveList: any = [];
  public ExchangeRejectList: any = [];
  exchangeId:number;
  order: string = 'leadowner';
  today: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  myDate = new Date();
  userDetails: any = [];
 
  constructor(private ExchangeService: ExchangeService,private datePipe: DatePipe,private route: Router,private toastr: ToastrService 
    ) {
    this.today = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    this.getApproveexchangeList();
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
  }

  getApproveexchangeList() {
    debugger;
    this.ExchangeService._getApproveExchanges().subscribe((data: any)=> {
      this.ExchangeApproveList = data.userData.approvalList;
      this.ExchangeRejectList = data.userData.rejectList;
      console.log(data);
      }, error => {
  
      })
    
  }
 
  
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll() {
    // for (var i = 0; i < this.leadData.length; i++) {
    //   this.leadData[i].isSelected = this.masterSelected;
    // }
    // this.getCheckedItemList();
  }
  isAllSelected() {
    // this.masterSelected = this.leadData.every(function (item: any) {
    //   return item.isSelected == true;
    // })
    // this.getCheckedItemList();
  }
  // ApproveExchange(id:number) {
  //   debugger;
    
  //     let jsonObj = {
  //       "exchangeId": id,
  //       "updatedBy": +this.userDetails['userId'],
  //       "updatedOn": this.today,
  //       "isActive": 1,
  //       "isAdminProveed": 1
  //         //userDetails['userId'],
  //     }
  //     this.ExchangeService.postApiCall("/api/V1/Exchange/ApproveExchange", jsonObj).subscribe(success => {
  //       debugger;
  //       this.route.navigate(['superadmin/manage-approval-list-detail']);
  //     }, error => {
  
  //     })
  //   }
    RejectExchange() {
      debugger;
        let jsonObj = {
          "exchangeId": this.exchangeId,
          "updatedBy": +this.userDetails['userId'],
          "updatedOn": this.today,
          "isActive": 0,
          "isAdminProveed": 0
            //userDetails['userId'],
        }
        this.ExchangeService.postApiCall("/api/V1/Exchange/RejectExchange", jsonObj).subscribe(success => {
          debugger;
          this.toastr.success('Exchange Rejected');
         
          this.getApproveexchangeList();
        }, error => {
    
        })
      }
   OpenModal(exchangeId:number)
   {
this.exchangeId=exchangeId;
   }
    
  getCheckedItemList() {
    // this.checkedList = [];
    // for (var i = 0; i < this.leadData.length; i++) {
    //   if (this.leadData[i].isSelected)
    //     this.checkedList.push(this.leadData[i]);
    // }
    // this.checkedList = JSON.stringify(this.checkedList);
  }

  


}
