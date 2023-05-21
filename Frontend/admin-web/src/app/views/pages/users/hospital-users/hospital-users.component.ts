import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalUsersService } from './hospital-users.service';
import { hospitalUser } from './hospital-user';
import { hospital } from '../../hospitals/hospital';
import { HospitalsService } from '../../hospitals/hospitals.service';

@Component({
  selector: 'app-user',
  templateUrl: './hospital-users.components.html',
  styleUrls: ['./hospital-users.components.scss'],
  preserveWhitespaces: true
})
export class HospitalUsersComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;

  hospitalUsers: hospitalUser[] = [];
  hospitals: hospital[] = [];
  loadingIndicator = true;
  ColumnMode = ColumnMode;

  name: any;
  address: any;
  nic: any;
  tpNumber: any;
  password: any;
  hospital: any;

  nameView: any;
  addressView: any;
  nicView: any;
  tpNumberView: any;
  hospitalView: any;

  selectedData: any = null;

  selected: any = {
    name: "",
    address: "",
    nic: "",
    tpNumber: "",
    password: "",
    hospital: ""
  };

  ViewSelected: any = {
    nameView: "",
    addressView: "",
    nicView: "",
    tpNumberView: "",
    hospitalView: ""
  };

  filters = {
    name: "",
    nic: ""
  }

  userRole: string = "";
  hospitalId: string = "";

  constructor(
    private modalService: NgbModal,
    private hospitalsService: HospitalsService,
    private hospitalUsersService: HospitalUsersService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.userRole = localStorage.getItem("userRole")!;
    if (this.userRole === "HospitalUser") {
      var userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

      this.hospitalId = userDetails.hospitalId ? userDetails.hospitalId : "";
    }

    this.getHospitalUsers();
    this.getHospitals();

    this.form = this.fb.group({
      name: [this.selected.name, [Validators.required]],
      address: [this.selected.address, [Validators.required]],
      nic: [this.selected.nic, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumber: [this.selected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      password: [this.selected.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      hospital: [this.selected.hospital, [Validators.required]],
    });

    this.editForm = this.fb.group({
      nameView: [this.ViewSelected.nameView, [Validators.required]],
      addressView: [this.ViewSelected.addressView, [Validators.required]],
      nicView: [this.ViewSelected.nicView, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumberView: [this.ViewSelected.tpNumberView, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      hospitalView: [this.selected.hospitalView, [Validators.required]]
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
      this.hospitalView = data.hospitalId;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  async filter() {

    const hospitalUsers = await this.hospitalUsersService.getHospitalUsers();
    const data: hospitalUser[] = hospitalUsers.data;

    const filtered = data.filter(hospitalUser => hospitalUser.name?.includes(this.filters.name) &&
      hospitalUser.nic?.includes(this.filters.nic)
    )

    this.hospitalUsers = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      nic: ""
    }
    const hospitalUsers = await this.hospitalUsersService.getHospitalUsers();
    this.hospitalUsers = hospitalUsers.data;
  }

  async getHospitals() {
    try {

      const hospitals = await this.hospitalsService.getHospital();

      if (this.hospitalId != "") {

        var filteredHospitals = hospitals.data.filter((a: any) => a.id == this.hospitalId);
        this.hospitals = filteredHospitals;
      } else {

        this.hospitals = hospitals.data;
      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async getHospitalUsers() {
    try {

      const hospitalUsers = await this.hospitalUsersService.getHospitalUsers();

      if (this.hospitalId != "") {

        var filteredHospitalUsers = hospitalUsers.data.filter((a: any) => a.hospitalId == this.hospitalId);
        this.hospitalUsers = filteredHospitalUsers;
      } else {

        this.hospitalUsers = hospitalUsers.data;
      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  saveData() {

    if (this.selectedData == null) {
      this.createHospitalUser();
    }
    else {
      this.updateHospitalUser();
    }

  }

  async createHospitalUser() {
    try {

      var data = {
        name: this.name,
        nic: this.nic,
        address: this.address,
        tpNumber: this.tpNumber,
        password: this.password,
        hospitalId: this.hospital,
      }

      const res = await this.hospitalUsersService.createHospitalUser(data);

      if (res.status == 200) {
        this.toast.show("Hospital User has been successfully saved", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getHospitalUsers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateHospitalUser() {
    try {

      var data = {
        name: this.nameView,
        nic: this.nicView,
        address: this.addressView,
        tpNumber: this.tpNumberView,
        hospitalId: this.hospitalView
      }

      const res = await this.hospitalUsersService.updateHospitalUser(this.selectedData.id, data);

      if (res.status == 200) {
        this.toast.show("Hospital User has been successfully updated", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getHospitalUsers();
        return;
      }

      this.selectedData == null;
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async deleteHospitalUser(data: any) {
    try {

      const res = await this.hospitalUsersService.deleteHospitalUser(data.id);

      if (res.status == 200) {
        this.toast.show("Hospital User has been successfully deleted", "success");
        this.getHospitalUsers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
