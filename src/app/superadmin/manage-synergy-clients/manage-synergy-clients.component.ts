import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-synergy-clients',
  templateUrl: './manage-synergy-clients.component.html',
  styleUrls: ['./manage-synergy-clients.component.css']
})
export class ManageSynergyClientsComponent implements OnInit {

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
      { id: 1, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 2, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 3, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 4, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 5, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 6, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 7, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 8, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 9, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 10, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 11, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 12, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 13, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 14, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 15, value: '', isSelected: false, "leadid": 'PE56894', "leadowner": 'Daniel', "leademail": 'William', "leadphone": '+1-541-754-3010', "leadunits": 'mai_william@gmail.com', "leadStatus": '+1-541-754-3010', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
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
