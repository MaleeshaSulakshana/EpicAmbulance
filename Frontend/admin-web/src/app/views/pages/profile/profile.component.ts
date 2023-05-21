import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './profile.components.html',
  styleUrls: ['./profile.components.scss'],
  preserveWhitespaces: true
})
export class ProfileComponent implements OnInit {

  isLoading = false;

  systemUserForm: FormGroup;
  hospitalUserForm: FormGroup;
  passwordChangeForm: FormGroup;

  profile: any = {};

  systemUserName: any;
  systemUserAddress: any;
  systemUserNic: any;
  systemUserTpNumber: any;

  hospitalUserName: any;
  hospitalUserAddress: any;
  hospitalUserNic: any;
  hospitalUserTpNumber: any;
  hospitalUserHospitalName: any;
  hospitalUserHospitalAddress: any;
  hospitalUserHospitalTpNumber: any;

  password: any;
  confirmPassword: any;

  systemUserSelected: any = {
    name: "",
    address: "",
    nic: "",
    tpNumber: ""
  };

  hospitalUserSelected: any = {
    name: "",
    address: "",
    nic: "",
    tpNumber: "",
    hospitalName: "",
    hospitalAddress: "",
    hospitalTpNumber: "",
  };

  passwordChangeSelected: any = {
    password: "",
    confirmPassword: ""
  };

  userRoleType: string = "";

  constructor(
    private profileService: ProfileService,
    public router: Router,
    private toast: ToastService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.userRoleType = localStorage.getItem('userRole')!;

    this.getProfileDetails();

    this.systemUserForm = this.fb.group({
      name: [this.systemUserSelected.name, [Validators.required]],
      address: [this.systemUserSelected.address, [Validators.required]],
      nic: [this.systemUserSelected.nic, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumber: [this.systemUserSelected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]]
    });

    this.systemUserForm.controls['nic'].disable();

    this.hospitalUserForm = this.fb.group({
      name: [this.hospitalUserSelected.name, [Validators.required]],
      address: [this.hospitalUserSelected.address, [Validators.required]],
      nic: [this.hospitalUserSelected.nic, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      tpNumber: [this.hospitalUserSelected.tpNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      hospitalName: [this.hospitalUserSelected.hospitalName, [Validators.required]],
      hospitalAddress: [this.hospitalUserSelected.hospitalAddress, [Validators.required]],
      hospitalTpNumber: [this.hospitalUserSelected.hospitalTpNumber, [Validators.required]]
    });

    this.hospitalUserForm.controls['nic'].disable();
    this.hospitalUserForm.controls['hospitalName'].disable();
    this.hospitalUserForm.controls['hospitalAddress'].disable();
    this.hospitalUserForm.controls['hospitalTpNumber'].disable();

    this.isLoading = false;

    this.passwordChangeForm = this.fb.group({
      password: [this.passwordChangeSelected.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: [this.passwordChangeSelected.confirmPassword, [Validators.required]]
    });
  }

  getProfileDetails() {
    if (this.userRoleType === "SystemUser") {

      this.getSystemUserDetails();
    } else {
      this.getHospitalUserDetails();
    }
  }

  updateProfileDetails() {
    if (this.userRoleType === "SystemUser") {

      this.updateSystemUserDetails();
    } else {
      this.updateHospitalUser();
    }
  }

  async getSystemUserDetails() {
    try {

      const profile = await this.profileService.getSystemUserProfileDetails(localStorage.getItem('userId')!);
      this.profile = profile.data;

      this.systemUserForm.patchValue({ "name": this.profile.name });
      this.systemUserForm.patchValue({ "address": this.profile.address });
      this.systemUserForm.patchValue({ "nic": this.profile.nic });
      this.systemUserForm.patchValue({ "tpNumber": this.profile.tpNumber });

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async getHospitalUserDetails() {
    try {

      const profile = await this.profileService.getHospitalUserProfileDetails(localStorage.getItem('userId')!);
      this.profile = profile.data;

      this.hospitalUserForm.patchValue({ "name": this.profile.name });
      this.hospitalUserForm.patchValue({ "address": this.profile.address });
      this.hospitalUserForm.patchValue({ "nic": this.profile.nic });
      this.hospitalUserForm.patchValue({ "tpNumber": this.profile.tpNumber });
      this.hospitalUserForm.patchValue({ "hospitalName": this.profile.hospital.name });
      this.hospitalUserForm.patchValue({ "hospitalAddress": this.profile.hospital.address });
      this.hospitalUserForm.patchValue({ "hospitalTpNumber": this.profile.hospital.tpNumber });

    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updateSystemUserDetails() {
    try {

      var data = {
        name: this.systemUserName,
        address: this.systemUserAddress,
        tpNumber: this.systemUserTpNumber
      }

      const res = await this.profileService.updateSystemUserProfile(localStorage.getItem('userId')!, data);

      if (res.status == 200) {
        this.toast.show("Profile has been successfully updated", "success");
        this.systemUserForm.reset();
        this.getProfileDetails();
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
        name: this.hospitalUserName,
        address: this.hospitalUserAddress,
        tpNumber: this.hospitalUserTpNumber
      }

      const res = await this.profileService.updateHospitalUserProfile(localStorage.getItem('userId')!, data);

      if (res.status == 200) {
        this.toast.show("Profile has been successfully updated", "success");
        this.hospitalUserForm.reset();
        this.getProfileDetails();
        return;
      }

      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

  async updatePassword() {
    try {

      var data = {
        password: this.password
      }

      if (this.userRoleType === "SystemUser") {

        const res = await this.profileService.updateSystemUserProfilePassword(localStorage.getItem('userId')!, data);

        if (res.status == 200) {
          this.toast.show("Profile password has been successfully updated", "success");
          this.passwordChangeForm.reset();
          this.getProfileDetails();
          return;
        }
      } else {

        const res = await this.profileService.updateHospitalUserProfilePassword(localStorage.getItem('userId')!, data);

        if (res.status == 200) {
          this.toast.show("Profile password has been successfully updated", "success");
          this.passwordChangeForm.reset();
          this.getProfileDetails();
          return;
        }
      }

      this.toast.show("Something went wrong", "error");
    } catch (error: any) {
      this.toast.show(error.statusText, 'error');
    }
  }

};
