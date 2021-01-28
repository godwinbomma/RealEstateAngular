import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-exchanges-list',
  templateUrl: './manage-exchanges-list.component.html',
  styleUrls: ['./manage-exchanges-list.component.css']
})
export class ManageExchangesListComponent implements OnInit {

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
      { id: 1, value: '', isSelected: false, "leadid": 'E-87654', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 2, value: '', isSelected: false, "leadid": 'E-87655', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 3, value: '', isSelected: false, "leadid": 'E-87656', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 4, value: '', isSelected: false, "leadid": 'E-87657', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 5, value: '', isSelected: false, "leadid": 'E-87658', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 6, value: '', isSelected: false, "leadid": 'E-87659', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 7, value: '', isSelected: false, "leadid": 'E-87660', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 8, value: '', isSelected: false, "leadid": 'E-87661', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 9, value: '', isSelected: false, "leadid": 'E-87662', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 10, value: '', isSelected: false, "leadid": 'E-87663', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 11, value: '', isSelected: false, "leadid": 'E-87664', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 12, value: '', isSelected: false, "leadid": 'E-87665', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 13, value: '', isSelected: false, "leadid": 'E-87666', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 14, value: '', isSelected: false, "leadid": 'E-87667', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 15, value: '', isSelected: false, "leadid": 'E-87668', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 16, value: '', isSelected: false, "leadid": 'E-87669', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' },
      { id: 17, value: '', isSelected: false, "leadid": 'E-87670', "leadowner": 'Chris Nolan', "leademail": '04/20/2020', "leadphone": '10/20/2020', "leadunits": '6/7/2020', "leadStatus": '10/20/2020', "leadSnotes": 'Excrow docs requested', "leadtask": 'Lorem ipsum a' }
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
