import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-synergy-clients-detail',
  templateUrl: './synergy-clients-detail.component.html',
  styleUrls: ['./synergy-clients-detail.component.css']
})
export class SynergyClientsDetailComponent implements OnInit {


  constructor() { }

multiboolean: boolean = true;

  ngOnInit(): void {
    $(function () {
      $(".multi-check").click(function () {
          if ($(this).is(":checked")) {
              $(".child-sec").show();

          } else {
              $(".child-sec").hide();

          }
      });
  });
  }

categories = [
    {id: 1, name: 'Laravel'},
    {id: 2, name: 'Codeigniter'},
    {id: 3, name: 'React'},
    {id: 4, name: 'PHP'},
    {id: 5, name: 'Angular'},
    {id: 6, name: 'Vue'},
    {id: 7, name: 'JQuery', disabled: true},
    {id: 8, name: 'Javascript'},
  ];

  selected = [
    {id: 5, name: 'Angular'},
    {id: 6, name: 'Vue'}
  ];

  getSelectedValue(){
    console.log(this.selected);
  }



}
