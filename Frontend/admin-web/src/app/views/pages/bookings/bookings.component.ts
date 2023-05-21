import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BookingsService } from "./bookings.service";
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { booking } from './booking';
import { HospitalsService } from '../hospitals/hospitals.service';
import { AmbulancesService } from '../ambulances/ambulances.service';
import { hospital } from '../hospitals/hospital';
import { ambulance } from '../ambulances/ambulance';

@Component({
  selector: 'app-user',
  templateUrl: './bookings.components.html',
  styleUrls: ['./bookings.components.scss'],
  preserveWhitespaces: true
})
export class BookingsComponent implements OnInit {

  bookings: booking[] = [];
  hospitals: hospital[] = [];
  ambulances: ambulance[] = [];

  loadingIndicator = true;
  ColumnMode = ColumnMode;

  dateTime: any;
  hospital: any;
  ambulance: any;
  user: any;
  address: any;
  tpNumber: any;
  details: any;
  status: any;

  selectedData: any = null;

  filters = {
    date: "",
    ambulance: "",
    hospital: ""
  }

  userRole: string = "";
  hospitalId: string = "";

  constructor(
    private modalService: NgbModal,
    private bookingsService: BookingsService,
    private hospitalsService: HospitalsService,
    private ambulancesService: AmbulancesService,
    public router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {

    this.userRole = localStorage.getItem("userRole")!;
    if (this.userRole === "HospitalUser") {
      var userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

      this.hospitalId = userDetails.hospitalId ? userDetails.hospitalId : "";
    }

    this.getBookings();
    this.getAmbulances();
    this.getHospitals();
  }

  openAddModal(content: TemplateRef<any>, data: any = null) {

    if (data != null) {
      this.selectedData = data;

      this.dateTime = data.dateTime;
      this.hospital = data.hospital.name;
      this.ambulance = data.ambulance.vehicleNo;
      this.user = data.user.name;
      this.address = data.address;
      this.tpNumber = data.tpNumber;
      this.details = data.details;
      this.status = data.status;

    } else {

      this.selectedData = null;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  openMap() {
    if (this.selectedData != null) {
      var url = `https://www.google.com/maps/search/?api=1&query=${this.selectedData.latitude},${this.selectedData.longitude}`
      window.open(url, "_blank");
    }
  }

  async filter() {

    const bookings = await this.bookingsService.getBookings();
    const data: booking[] = bookings.data;

    console.log(this.filters.date)

    const filtered = data.filter(booking => booking.dateTime?.includes(this.filters.date) &&
      booking.hospitalId?.includes(this.filters.hospital) &&
      booking.ambulanceId?.includes(this.filters.ambulance)
    )

    this.bookings = filtered;
  }

  async reset() {
    this.filters = {
      date: "",
      hospital: "",
      ambulance: ""
    }
    const bookings = await this.bookingsService.getBookings();
    this.bookings = bookings.data;
  }

  async getBookings() {
    try {

      const bookings = await this.bookingsService.getBookings();

      if (this.hospitalId != "") {

        var filteredBookings = bookings.data.filter((a: any) => a.hospitalId == this.hospitalId);
        this.bookings = filteredBookings;
      } else {

        this.bookings = bookings.data;
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

};
