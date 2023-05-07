import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmbulancesService } from './ambulances.service';
import { ambulance } from './ambulance';
import { HospitalsService } from '../hospitals/hospitals.service';
import { hospital } from '../hospitals/hospital';

@Component({
  selector: 'app-user',
  templateUrl: './ambulances.components.html',
  styleUrls: ['./ambulances.components.scss'],
  preserveWhitespaces: true
})
export class AmbulancesComponent implements OnInit {
  form: FormGroup;

  ambulances: ambulance[] = [];
  hospitals: hospital[] = [];

  loadingIndicator = true;
  ColumnMode = ColumnMode;

  vehicleNo: any;
  type: any;
  address: any;
  tpNumber: any;
  hospital: any;

  selectedData: any = null;

  selected: any = {
    vehicleNo: "",
    type: "",
    address: "",
    tpNumber: "",
    hospital: ""
  };

  filters = {
    vehicleNo: "",
    hospital: "",
    type: ""
  }


  constructor(
    private modalService: NgbModal,
    private hospitalsService: HospitalsService,
    private ambulancesService: AmbulancesService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAmbulances();
    this.getHospitals();

    this.form = this.fb.group({
      vehicleNo: [this.selected.vehicleNo, [Validators.required]],
      type: [this.selected.type, [Validators.required]],
      address: [this.selected.address, [Validators.required]],
      tpNumber: [this.selected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      hospital: [this.selected.hospital, [Validators.required]],
    });
  }

  openAddModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {
      this.selectedData = data;

      this.vehicleNo = data.vehicleNo;
      this.type = data.type;
      this.address = data.address;
      this.tpNumber = data.tpNumber;
      this.hospital = data.hospital;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  async filter() {

    const ambulances = await this.ambulancesService.getAmbulances();
    const data: ambulance[] = ambulances.data;

    const filtered = data.filter(ambulance => ambulance.vehicleNo?.includes(this.filters.vehicleNo) &&
      ambulance.hospitalId?.includes(this.filters.hospital) &&
      ambulance.type?.includes(this.filters.type)
    )

    this.ambulances = filtered;
  }

  async reset() {
    this.filters = {
      vehicleNo: "",
      hospital: "",
      type: ""
    }
    const ambulances = await this.ambulancesService.getAmbulances();
    this.ambulances = ambulances.data;
  }

  async getAmbulances() {
    try {

      const ambulances = await this.ambulancesService.getAmbulances();
      this.ambulances = ambulances.data;

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
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
      this.createAmbulance();
    }
    else {
      this.updateAmbulance();
    }

  }

  async createAmbulance() {
    try {

      var data = {
        vehicleNo: this.vehicleNo,
        type: this.type,
        address: this.address,
        // tpNumber: this.tpNumber,
        hospitalId: this.hospital
      }

      const res = await this.ambulancesService.createAmbulance(data);

      if (res.status == 200) {
        this.toast.show("Ambulance has been successfully saved", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getAmbulances();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateAmbulance() {
    try {

      var data = {
        vehicleNo: this.vehicleNo,
        type: this.type,
        address: this.address,
        // tpNumber: this.tpNumber,
        hospitalId: this.hospital
      }

      const res = await this.ambulancesService.updateAmbulance(this.selectedData.id, data);

      if (res.status == 200) {
        this.toast.show("Ambulance has been successfully updated", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getAmbulances();
        return;
      }

      this.selectedData == null;
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async deleteAmbulance(data: any) {
    try {

      const res = await this.ambulancesService.deleteAmbulance(data.id);

      if (res.status == 200) {
        this.toast.show("Ambulance has been successfully deleted", "success");
        this.getAmbulances();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
