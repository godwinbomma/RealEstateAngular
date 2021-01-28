import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{ ExchangeService} from '../../service/exchange.service';
import { ToastrService } from 'ngx-toastr';



@Component({
selector: 'app-manage-intake-form',
templateUrl: './manage-intake-form.component.html',
styleUrls: ['./manage-intake-form.component.css']
})
export class ManageIntakeFormComponent implements OnInit {
Exchanges: any = {};
datePickerConfig = {
format: 'MM/DD/YYYY'
};
constructor(
private formBuilder: FormBuilder,
private activated_route: ActivatedRoute,
private ExchangeService: ExchangeService,
private route: Router,
private toastr: ToastrService
) { }

ngOnInit(): void {


}

addExchange() {
debugger;
let jsonObj = {
"customerName": this.Exchanges.CustomerName,
"customerEmail": this.Exchanges.Email,
"customerPhoneNumber": this.Exchanges.Phone,
"loginUserId":+sessionStorage.getItem('userDetails'),
"officerName": this.Exchanges.SettlementAgent,
"companyName": this.Exchanges.EscrowCompany,
"officerPhone": this.Exchanges.EscrowPhone,
"officerEmail": this.Exchanges.EscrowOfficerEmail,
"propertyTitle": this.Exchanges.Propertytitle,
"expectedClosingDate": "2020-09-29T17:34:45.831Z",
"referralSource": this.Exchanges.Referral,
"date": "2020-09-29T17:34:45.831Z",
"valueOfProperty": +this.Exchanges.SalesPrice,
"debitOfProperty": +this.Exchanges.debt,
"propertyAddress": this.Exchanges.RelinquishedAddress,
"ownershipInterest": this.Exchanges.CustomerName,
"note": this.Exchanges.Notes
//userDetails['userId'],
}

this.ExchangeService.postApiCall("/Exchange/AddExchange", jsonObj).subscribe((data:any) => {
debugger;
this.toastr.success('Exchange created successfully');
this.route.navigate(['exchange/approval/list']);
}, (error:any) => {

})
}

}