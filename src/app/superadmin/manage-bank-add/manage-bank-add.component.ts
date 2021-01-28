import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-bank-add',
  templateUrl: './manage-bank-add.component.html',
  styleUrls: ['./manage-bank-add.component.css']
})
export class ManageBankAddComponent implements OnInit {


	datePickerConfig = {
    format: 'DD-MM-YYYY'
  };

public leadData: any = [];

order: string = 'leadowner';
p: number = 0;
reverse: boolean = false;
masterSelected: boolean;
checkedList: any;
constructor() {
  for (let i = 1; i <= 100; i++) {
    this.leadData.push(`item ${i}`);
  }
  this.masterSelected = false;

  this.getCheckedItemList();
}
ngOnInit(): void {
  this.leadData = [
    { id: 1, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' },
    { id: 2, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.01%', "leademail": '05/13/2019'},
    { id: 3, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '08/28/2020'},
    { id: 4, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '05/13/2021'},
    { id: 5, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' },
    { id: 6, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.6%', "leademail": '04/20/2018' },
    { id: 7, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' },
    { id: 8, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' },
    { id: 9, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' },
    { id: 10, value: '', isSelected: false, "leadid": '04/15/2020', "leadowner": '1.3%', "leademail": '04/20/2018' }
  ];
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
