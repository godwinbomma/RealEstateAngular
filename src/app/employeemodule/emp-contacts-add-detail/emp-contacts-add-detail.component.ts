import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-emp-contacts-add-detail',
  templateUrl: './emp-contacts-add-detail.component.html',
  styleUrls: ['./emp-contacts-add-detail.component.css']
})
export class EmpContactsAddDetailComponent implements OnInit {
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  Contacts: any = {};
  ContactId: number;
  constructor
    (
    private contactservice: ContactService,
    private activated_route: ActivatedRoute
  ) {
    //for (let i = 1; i <= 100; i++) {
    //  this.leadData.push(`item ${i}`);
    //}
    //this.masterSelected = false;

    //this.getCheckedItemList();
  }
  ngOnInit(): void {
    this.activated_route.params.subscribe(params => {
    this.ContactId = Number(params['id']);
    });
    //this.ContactId = this.activated_route.snapshot.queryParamMap.get('id');
    //// let id = this._manager_service.getId();
    //!== null || undefined
    let contactid = Number.isNaN(this.ContactId);
    if (contactid != true) {
      //this.updateNegotiator = true;
      this._getContactdetails_byId(this.ContactId)
    }
  }
  setorder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  checkUncheckAll() {
    //for (var i = 0; i < this.leadData.length; i++) {
    //  this.leadData[i].isSelected = this.masterSelected;
    //}
    //this.getCheckedItemList();
  }
  isAllSelected() {
    ////this.masterSelected = this.leadData.every(function (item: any) {
    ////  return item.isSelected == true;
    ////})
    ////this.getCheckedItemList();
  }

  getCheckedItemList() {
    //this.checkedList = [];
    //for (var i = 0; i < this.leadData.length; i++) {
    //  if (this.leadData[i].isSelected)
    //    this.checkedList.push(this.leadData[i]);
    //}
    //this.checkedList = JSON.stringify(this.checkedList);
  }
  _getContactdetails_byId(ContactId: number) {
    debugger;
    this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
      console.log(data)
      debugger;
      this.Contacts = data['userData'];
    })
  }
}
