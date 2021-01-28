import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ExchangeService } from '../../../service/exchange.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUrl: string | undefined
  Superadmin:any={};
  userDetails:any=[];
  date: Date;
  constructor(private ExchangeService: ExchangeService,private route: Router, private toastr: ToastrService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.currentUrl = this.route.url;
    //console.log("route " ,this.currentUrl);
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
  sendmessage()
  {
      //debugger;
      this.date = new Date();
      let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');
      this.ExchangeService.sendmessage(this.Superadmin.Message, +this.userDetails['userId'],latest_date).subscribe(success => {
          //debugger;
          this.toastr.success('Message sent successfully');
          this.Superadmin.Message="";
      }, error => {

      })

  }

}
