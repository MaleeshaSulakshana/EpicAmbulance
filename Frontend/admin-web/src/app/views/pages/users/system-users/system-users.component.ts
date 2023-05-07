import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemUsersService } from './system-users.service';
import { systemUser } from './system-user';

@Component({
  selector: 'app-user',
  templateUrl: './system-users.components.html',
  styleUrls: ['./system-users.components.scss'],
  preserveWhitespaces: true
})
export class SystemUsersComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;

  systemUsers: systemUser[] = [];
  loadingIndicator = true;
  ColumnMode = ColumnMode;

  name: any;
  address: any;
  nic: any;
  tpNumber: any;
  password: any;

  nameView: any;
  addressView: any;
  nicView: any;
  tpNumberView: any;

  selectedData: any = null;

  selected: any = {
    name: "",
    address: "",
    nic: "",
    tpNumber: "",
    password: ""
  };

  ViewSelected: any = {
    nameView: "",
    addressView: "",
    nicView: "",
    tpNumberView: ""
  };

  filters = {
    name: "",
    nic: ""
  }


  constructor(
    private modalService: NgbModal,
    private systemUsersService: SystemUsersService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSystemUsers();

    this.form = this.fb.group({
      name: [this.selected.name, [Validators.required]],
      address: [this.selected.address, [Validators.required]],
      nic: [this.selected.nic, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumber: [this.selected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      password: [this.selected.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });

    this.editForm = this.fb.group({
      nameView: [this.ViewSelected.nameView, [Validators.required]],
      addressView: [this.ViewSelected.addressView, [Validators.required]],
      nicView: [this.ViewSelected.nicView, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumberView: [this.ViewSelected.tpNumberView, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  openModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {

      this.selectedData = data;

      this.nameView = data.name;
      this.addressView = data.address;
      this.nicView = data.nic;
      this.tpNumberView = data.tpNumber;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  async filter() {

    const systemUsers = await this.systemUsersService.getSystemUsers();
    const data: systemUser[] = systemUsers.data;

    const filtered = data.filter(systemUser => systemUser.name?.includes(this.filters.name) &&
      systemUser.nic?.includes(this.filters.nic)
    )

    this.systemUsers = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      nic: ""
    }
    const systemUsers = await this.systemUsersService.getSystemUsers();
    this.systemUsers = systemUsers.data;
  }

  async getSystemUsers() {
    try {

      const systemUsers = await this.systemUsersService.getSystemUsers();
      this.systemUsers = systemUsers.data;

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  saveData() {

    if (this.selectedData == null) {
      this.createSystemUser();
    }
    else {
      this.updateSystemUser();
    }

  }

  async createSystemUser() {
    try {

      var data = {
        name: this.name,
        nic: this.nic,
        address: this.address,
        tpNumber: this.tpNumber,
        password: this.password
      }

      const res = await this.systemUsersService.createSystemUser(data);

      if (res.status == 200) {
        this.toast.show("System User has been successfully saved", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getSystemUsers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateSystemUser() {
    try {

      var data = {
        name: this.nameView,
        nic: this.nicView,
        address: this.addressView,
        tpNumber: this.tpNumberView
      }

      const res = await this.systemUsersService.updateSystemUser(this.selectedData.id, data);

      if (res.status == 200) {
        this.toast.show("System User has been successfully updated", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getSystemUsers();
        return;
      }

      this.selectedData == null;
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async deleteSystemUser(data: any) {
    try {

      const res = await this.systemUsersService.deleteSystemUser(data.id);

      if (res.status == 200) {
        this.toast.show("System User has been successfully deleted", "success");
        this.getSystemUsers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
