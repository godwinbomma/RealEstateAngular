import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userDetails: any = [];
  RevenueMonth:boolean;
RevenueYear:boolean;
FilesMonth:boolean;
FilesYear:boolean;
SynergyExchange:boolean;
SynergyAccounts:boolean;
MonthlyAccount:boolean;
Usertypeid:number;
  currentUrl: string | undefined
  constructor(private route: Router) { }

  ngOnInit(): void {
    debugger;
    this.currentUrl = this.route.url;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.RevenueMonth=this.userDetails['revenueMonth'];
    this.RevenueYear=this.userDetails['revenueYear'];
    this.SynergyAccounts=this.userDetails['synergyAccounts'];
    this.FilesMonth=this.userDetails['filesMonth'];
    this.FilesYear=this.userDetails['filesYear'];
    this.MonthlyAccount=this.userDetails['monthlyAccount'];
    this.SynergyExchange=this.userDetails['synergyExchange'];
    this.Usertypeid=this.userDetails['userTypeId']
    $(document).ready(function () {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      // $("#close-sidebar").click(function () {
      //   $(".page-wrapper").removeClass("toggled");
      // });
      // $("#show-sidebar").click(function () {
      //   $(".page-wrapper").addClass("toggled");
      // });

      $('#menuburger').click(function () {
        $("body").toggleClass("toggled-active");
      });
      $('#close-sidebar').click(function () {
        $("body").removeClass("toggled-active");
      });
      $('#menuburgerMobile').click(function () {
        $("body").toggleClass("toggled-active");
      });
      $('#close-sidebar').click(function () {
        $("body").removeClass("toggled-active");
      });

    });
  }




}
