import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { HospitalsService } from "./hospitals.service";
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { hospital } from './hospital';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './hospitals.components.html',
  styleUrls: ['./hospitals.components.scss'],
  preserveWhitespaces: true
})
export class HospitalsComponent implements OnInit {

  form: FormGroup;

  hospitals: hospital[] = [];
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
    private hospitalsService: HospitalsService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getHospitals();

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

    const hospitals = await this.hospitalsService.getHospital();
    const data: hospital[] = hospitals.data;

    const filtered = data.filter(hospital => hospital.name?.includes(this.filters.name) &&
      hospital.address?.includes(this.filters.address) &&
      hospital.type?.includes(this.filters.type)
    )

    this.hospitals = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      address: "",
      type: ""
    }
    const hospitals = await this.hospitalsService.getHospital();
    this.hospitals = hospitals.data;
  }

  async getHospitals() {
    try {

      const hospitals = await this.hospitalsService.getHospital();
      this.hospitals = hospitals.data;

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  saveData() {

    if (this.selectedData == null) {
      this.createHospital();
    }
    else {
      this.updateHospital();
    }

  }

  async createHospital() {
    try {

      var data = {
        name: this.name,
        type: this.type,
        address: this.address,
        tpNumber: this.tpNumber
      }

      const res = await this.hospitalsService.createHospital(data);

      if (res.status == 200) {
        this.toast.show("Hospital has been successfully saved", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getHospitals();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateHospital() {
    try {

      var data = {
        name: this.name,
        type: this.type,
        address: this.address,
        tpNumber: this.tpNumber
      }

      const res = await this.hospitalsService.updateHospital(this.selectedData.id, data);

      if (res.status == 200) {
        this.toast.show("Hospital has been successfully updated", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getHospitals();
        return;
      }

      this.selectedData == null;
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async deleteHospital(data: any) {
    try {

      const res = await this.hospitalsService.deleteHospital(data.id);

      if (res.status == 200) {
        this.toast.show("Hospital has been successfully deleted", "success");
        this.getHospitals();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
