import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-balance-breakdown-edit',
  templateUrl: './reports-balance-breakdown-edit.component.html',
  styleUrls: ['./reports-balance-breakdown-edit.component.css']
})
export class ReportsBalanceBreakdownEditComponent implements OnInit {
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
