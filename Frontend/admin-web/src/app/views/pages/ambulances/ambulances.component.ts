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
  hospital: any;

  selectedData: any = null;

  selected: any = {
    vehicleNo: "",
    type: "",
    hospital: ""
  };

  filters = {
    vehicleNo: "",
    hospital: "",
    type: ""
  }

  userRole: string = "";
  hospitalId: string = "";

  constructor(
    private modalService: NgbModal,
    private hospitalsService: HospitalsService,
    private ambulancesService: AmbulancesService,
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

    this.getAmbulances();
    this.getHospitals();

    this.form = this.fb.group({
      vehicleNo: [this.selected.vehicleNo, [Validators.required]],
      type: [this.selected.type, [Validators.required]],
      hospital: [this.selected.hospital, [Validators.required]],
    });
  }

  openAddModal(content: TemplateRef<any>, data: any = null) {

    this.vehicleNo = "";
    this.type = "";
    this.hospital = "";
    this.selectedData = null;

    if (data != null) {
      this.selectedData = data;

      this.vehicleNo = data.vehicleNo;
      this.type = data.type;
      this.hospital = data.hospitalId;

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

      if (this.hospitalId != "") {

        var filteredAmbulances = ambulances.data.filter((a: any) => a.hospitalId == this.hospitalId);
        this.ambulances = filteredAmbulances;
      } else {

        this.ambulances = ambulances.data;
      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
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
