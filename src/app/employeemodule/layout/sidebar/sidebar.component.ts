import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUrl: string | undefined
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.route.url;
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
