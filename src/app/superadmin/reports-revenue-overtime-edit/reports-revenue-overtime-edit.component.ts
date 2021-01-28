import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-revenue-overtime-edit',
  templateUrl: './reports-revenue-overtime-edit.component.html',
  styleUrls: ['./reports-revenue-overtime-edit.component.css']
})
export class ReportsRevenueOvertimeEditComponent implements OnInit {
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
