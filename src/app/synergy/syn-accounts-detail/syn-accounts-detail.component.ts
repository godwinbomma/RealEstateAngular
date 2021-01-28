import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { ContactService } from '../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
@Component({
  selector: 'app-syn-accounts-detail',
  templateUrl: './syn-accounts-detail.component.html',
  styleUrls: ['./syn-accounts-detail.component.css']
})
export class SynAccountsDetailComponent implements OnInit {
  exchangeid: number;
  Userdetails:any=[];
  accountdetails:any=[];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
  totalbalance:number;
  constructor( private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private contactservice: ContactService,
    private excelService: ServiceService,
    private activated_route: ActivatedRoute) {
       this.activated_route.params.subscribe(params => {
      this.exchangeid = Number(params['id']);
    }); }

  ngOnInit(): void {
   this.getexchangeaccount();
  }

  getexchangeaccount() {
    debugger;
    
    this.contactservice._getAccountsExchange(this.exchangeid).subscribe((data:any) => {
      debugger;
      console.log(data['userData']);
      this.Userdetails = data['userData']['accountsHeader'];
      this.accountdetails = data['userData']['transactionsList'];
      this.totalbalance=this.accountdetails.reduce((a:any, b:any) => a + (b["balance"] || 0), 0);
    }, (error:any) => {

    })
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.accountdetails, 'sample');
  }

}
