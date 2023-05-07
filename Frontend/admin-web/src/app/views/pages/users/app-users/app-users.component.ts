import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUsersService } from './app-users.service';
import { appUser } from './app-users';

@Component({
  selector: 'app-user',
  templateUrl: './app-users.components.html',
  styleUrls: ['./app-users.components.scss'],
  preserveWhitespaces: true
})
export class AppUsersComponent implements OnInit {
  form: FormGroup;

  appUsers: appUser[] = [];
  loadingIndicator = true;
  ColumnMode = ColumnMode;

  name: any;
  type: any;
  address: any;
  tpNumber: any;

  selectedData: any = null;

  selected: any = {
    name: "",
    type: "",
    address: "",
    tpNumber: ""
  };

  filters = {
    name: "",
    address: "",
    type: ""
  }


  constructor(
    private modalService: NgbModal,
    private appUsersService: AppUsersService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAppUsers();

    this.form = this.fb.group({
      name: [this.selected.name, [Validators.required]],
      type: [this.selected.type, [Validators.required]],
      address: [this.selected.address, [Validators.required]],
      tpNumber: [this.selected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  openAddModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {
      this.selectedData = data;

      this.name = data.name;
      this.type = data.type;
      this.address = data.address;
      this.tpNumber = data.tpNumber;

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
      appUser.address?.includes(this.filters.address) &&
      appUser.type?.includes(this.filters.type)
    )

    this.appUsers = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      address: "",
      type: ""
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

  // saveData() {

  //   if (this.selectedData == null) {
  //     this.createAppUser();
  //   }
  //   else {
  //     this.updateAppUser();
  //   }

  // }

  // async createAppUser() {
  //   try {

  //     var data = {
  //       name: this.name,
  //       type: this.type,
  //       address: this.address,
  //       tpNumber: this.tpNumber
  //     }

  //     const res = await this.appUsersService.createAppUser(data);

  //     if (res.status == 200) {
  //       this.toast.show("App User has been successfully saved", "success");
  //       this.modalService.dismissAll();
  //       this.form.reset();
  //       this.getAppUsers();
  //       return;
  //     }
  //     this.toast.show("Something went wrong", "error");
  //   } catch (error: any) {
  //     this.toast.show(error.statusText, 'error');
  //   }
  // }

  // async updateAppUser() {
  //   try {

  //     var data = {
  //       name: this.name,
  //       type: this.type,
  //       address: this.address,
  //       tpNumber: this.tpNumber
  //     }

  //     const res = await this.appUsersService.updateAppUser(this.selectedData.id, data);

  //     if (res.status == 200) {
  //       this.toast.show("App User has been successfully updated", "success");
  //       this.modalService.dismissAll();
  //       this.form.reset();
  //       this.getAppUsers();
  //       return;
  //     }

  //     this.selectedData == null;
  //     this.toast.show("Something went wrong", "error");
  //   } catch (error: any) {
  //     this.toast.show(error.statusText, 'error');
  //   }
  // }

  // async deleteAppUser(data: any) {
  //   try {

  //     const res = await this.appUsersService.deleteAppUser(data.id);

  //     if (res.status == 200) {
  //       this.toast.show("App User has been successfully deleted", "success");
  //       this.getAppUsers();
  //       return;
  //     }
  //     this.toast.show("Something went wrong", "error");
  //   } catch (error: any) {
  //     this.toast.show(error.statusText, 'error');
  //   }
  // }

};
