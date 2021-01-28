import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-revenue-overtime',
  templateUrl: './reports-revenue-overtime.component.html',
  styleUrls: ['./reports-revenue-overtime.component.css']
})
export class ReportsRevenueOvertimeComponent implements OnInit {
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
