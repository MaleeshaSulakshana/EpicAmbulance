import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmbulanceCrewMembersService } from './ambulance-crew-members.service';
import { ambulanceCrewMember } from './ambulance-crew-members';
import { hospital } from '../../hospitals/hospital';
import { HospitalsService } from '../../hospitals/hospitals.service';
import { ambulance } from '../../ambulances/ambulance';
import { AmbulancesService } from '../../ambulances/ambulances.service';

@Component({
  selector: 'app-user',
  templateUrl: './ambulance-crew-members.components.html',
  styleUrls: ['./ambulance-crew-members.components.scss'],
  preserveWhitespaces: true
})
export class AmbulanceCrewMembersComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;

  ambulanceCrewMembers: ambulanceCrewMember[] = [];
  hospitals: hospital[] = [];
  ambulances: ambulance[] = [];

  loadingIndicator = true;
  ColumnMode = ColumnMode;

  name: any;
  address: any;
  nic: any;
  tpNumber: any;
  password: any;
  hospital: any;
  ambulance: any;

  nameView: any;
  addressView: any;
  nicView: any;
  tpNumberView: any;
  hospitalView: any;
  ambulanceView: any;

  selectedData: any = null;

  selected: any = {
    name: "",
    address: "",
    nic: "",
    tpNumber: "",
    password: "",
    hospital: "",
    ambulance: "",
  };

  ViewSelected: any = {
    nameView: "",
    addressView: "",
    nicView: "",
    tpNumberView: "",
    hospitalView: "",
    ambulanceView: "",
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
    private ambulancesService: AmbulancesService,
    private ambulanceCrewMembersService: AmbulanceCrewMembersService,
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

    this.getAmbulanceCrewMembers();
    this.getHospitals();

    this.form = this.fb.group({
      name: [this.selected.name, [Validators.required]],
      address: [this.selected.address, [Validators.required]],
      nic: [this.selected.nic, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumber: [this.selected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      password: [this.selected.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      hospital: [this.selected.hospital, [Validators.required]],
      ambulance: [this.selected.ambulance, [Validators.required]],
    });

    this.editForm = this.fb.group({
      nameView: [this.ViewSelected.nameView, [Validators.required]],
      addressView: [this.ViewSelected.addressView, [Validators.required]],
      nicView: [this.ViewSelected.nicView, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumberView: [this.ViewSelected.tpNumberView, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      hospitalView: [this.ViewSelected.hospitalView, [Validators.required]],
      ambulanceView: [this.ViewSelected.ambulanceView, [Validators.required]]
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onChangeHospital(event: any) {
    this.getAmbulancesByHospitalId(event.target.value);
  }

  openModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {

      this.selectedData = data;

      this.getAmbulancesByHospitalId(data.hospitalId);

      this.nameView = data.name;
      this.addressView = data.address;
      this.nicView = data.nic;
      this.tpNumberView = data.tpNumber;
      this.hospitalView = data.hospitalId;
      this.ambulanceView = data.ambulanceId;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  async filter() {

    const ambulanceCrewMembers = await this.ambulanceCrewMembersService.getAmbulanceCrewMembers();
    const data: ambulanceCrewMember[] = ambulanceCrewMembers.data;

    const filtered = data.filter(ambulanceCrewMember => ambulanceCrewMember.name?.includes(this.filters.name) &&
      ambulanceCrewMember.nic?.includes(this.filters.nic)
    )

    this.ambulanceCrewMembers = filtered;
  }

  async reset() {
    this.filters = {
      name: "",
      nic: ""
    }
    const ambulanceCrewMembers = await this.ambulanceCrewMembersService.getAmbulanceCrewMembers();
    this.ambulanceCrewMembers = ambulanceCrewMembers.data;
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

  async getAmbulancesByHospitalId(id: string) {
    try {

      const ambulances = await this.ambulancesService.getAmbulancesByHospitalId(id);
      this.ambulances = ambulances.data;

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async getAmbulanceCrewMembers() {
    try {

      const ambulanceCrewMembers = await this.ambulanceCrewMembersService.getAmbulanceCrewMembers();

      if (this.hospitalId != "") {

        var filteredAmbulanceCrewMembers = ambulanceCrewMembers.data.filter((a: any) => a.hospitalId == this.hospitalId);
        this.ambulanceCrewMembers = filteredAmbulanceCrewMembers;
      } else {

        this.ambulanceCrewMembers = ambulanceCrewMembers.data;
      }

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  saveData() {

    if (this.selectedData == null) {
      this.createAmbulanceCrewMember();
    }
    else {
      this.updateAmbulanceCrewMember();
    }

  }

  async createAmbulanceCrewMember() {
    try {

      var data = {
        name: this.name,
        nic: this.nic,
        address: this.address,
        tpNumber: this.tpNumber,
        password: this.password,
        hospitalId: this.hospital,
        ambulanceId: this.ambulance
      }

      const res = await this.ambulanceCrewMembersService.createAmbulanceCrewMember(data);

      if (res.status == 200) {
        this.toast.show("Ambulance Crew Member has been successfully saved", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getAmbulanceCrewMembers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateAmbulanceCrewMember() {
    try {

      var data = {
        name: this.nameView,
        nic: this.nicView,
        address: this.addressView,
        tpNumber: this.tpNumberView,
        hospitalId: this.hospitalView,
        ambulanceId: this.ambulanceView
      }

      const res = await this.ambulanceCrewMembersService.updateAmbulanceCrewMember(this.selectedData.id, data);

      if (res.status == 200) {
        this.toast.show("Ambulance Crew Member has been successfully updated", "success");
        this.modalService.dismissAll();
        this.form.reset();
        this.getAmbulanceCrewMembers();
        return;
      }

      this.selectedData == null;
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async deleteAmbulanceCrewMember(data: any) {
    try {

      const res = await this.ambulanceCrewMembersService.deleteAmbulanceCrewMember(data.id);

      if (res.status == 200) {
        this.toast.show("Ambulance Crew Member has been successfully deleted", "success");
        this.getAmbulanceCrewMembers();
        return;
      }
      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
