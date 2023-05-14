import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { AppUsersService } from './app-users.service';
import { appUser } from './app-users';

@Component({
  selector: 'app-user',
  templateUrl: './app-users.components.html',
  styleUrls: ['./app-users.components.scss'],
  preserveWhitespaces: true
})
export class AppUsersComponent implements OnInit {

  appUsers: appUser[] = [];
  loadingIndicator = true;
  ColumnMode = ColumnMode;

  name: any;
  address: any;
  tpNumber: any;
  email: any;
  nic: any;

  selectedData: any = null;

  filters = {
    name: "",
    tpNumber: "",
    nic: ""
  }


  constructor(
    private modalService: NgbModal,
    private appUsersService: AppUsersService,
    public router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.getAppUsers();
  }

  openAddModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {
      this.selectedData = data;

      this.name = data.name;
      this.address = data.address;
      this.tpNumber = data.tpNumber;
      this.email = data.email;
      this.nic = data.nic;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  async filter() {

    const appUsers = await this.appUsersService.getAppUsers();
    const data: appUser[] = appUsers.data;

    const filtered = data.filter(appUser => appUser.name?.includes(this.filters.name) &&
      appUser.tpNumber?.includes(this.filters.tpNumber) &&
      appUser.nic?.includes(this.filters.nic)
    )

    this.appUsers = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      tpNumber: "",
      nic: ""
    }
    const appUsers = await this.appUsersService.getAppUsers();
    this.appUsers = appUsers.data;
  }

  async getAppUsers() {
    try {

      const appUsers = await this.appUsersService.getAppUsers();
      this.appUsers = appUsers.data;

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
