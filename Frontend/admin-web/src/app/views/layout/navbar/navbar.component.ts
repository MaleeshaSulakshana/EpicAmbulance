import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: string = "";
  username: string = "";
  hospital: string = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setUserDetailsOnDropDown();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.clear();

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  setUserDetailsOnDropDown() {
    var userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
    if (userDetails != "") {

      this.name = userDetails.name;
      this.username = localStorage.getItem("userName") || "";
      this.hospital = userDetails?.hospital?.name;

    }
  }

}
