import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";
import { ToastService } from "../../../../core/services/toast.service";
import { Buffer } from 'buffer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: any;
  show: boolean = false;
  general: any = {
    username: '',
    password: '',
  }
  isLoading = true;

  constructor(
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.isLoading = false;
    this.form = this.fb.group({
      username: [this.general.username, [Validators.required]],
      password: [this.general.password, [Validators.required]]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  async onLoggedin(e: Event) {

    this.isLoading = true;
    e.preventDefault();

    localStorage.setItem('isLoggedin', 'true');
    // localStorage.setItem('permissions', JSON.stringify(['super.admin']));

    try {

      var query = {
        username: this.form.value.username,
        password: this.form.value.password
      }

      const res: any = await this.authService.login(query);

      if (res.status == 200) {

        var JWTData: any = this.parseJwt(res.data);
        localStorage.setItem('accessToken', res.data);

        localStorage.setItem("userId", JWTData.sub);
        localStorage.setItem("userName", JWTData.userName);
        localStorage.setItem("userRole", JWTData.userRole);

        var permissions = JSON.parse(JWTData.permissions);
        localStorage.setItem("permissions", JSON.stringify(['super.admin']));


        if (localStorage.getItem('isLoggedin')) {
          this.getUserDetails(localStorage.getItem("userId"));
          // this.isLoading = false;
          // this.router.navigate([this.returnUrl]);
        }

      }

    } catch (error: any) {
      this.isLoading = false;
      this.toast.show(error?.data?.errors[0]?.title, 'error');
    }
  }

  parseJwt(token: any) {
    const res = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return res;
  }

  eye(e: Event) {
    e.preventDefault();
    this.show = !this.show
  }

  async getUserDetails(id: any) {
    try {
      var response: any = null;
      if (localStorage.getItem("userRole") === "SystemUser") {
        response = await this.authService.getSystemUserDetails(id);
      } else {
        response = await this.authService.getHospitalUserDetails(id);
      }

      if (response != null) {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
      }

      this.isLoading = false;
      this.router.navigate([this.returnUrl]);

    } catch (error: any) {
      this.toast.show(error.statusText, "error");
    }
  }

}
