import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from "../auth.service";
import { authStore } from "../../../../../environments/authStore";
import { ToastService } from "../../../../core/services/toast.service";
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';
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

  private username: string = "";

  constructor(private toast: ToastService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private http: HttpService, private authService: AuthService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.isLoading = false;
    // get return url from route parameters or default to '/'
    this.form = this.fb.group({
      username: [this.general.username, [Validators.required]],
      password: [this.general.password, [Validators.required]]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  async onLoggedin(e: Event) {
    // e.preventDefault();
    // localStorage.setItem('isLoggedin', 'true');
    // localStorage.setItem('permissions', JSON.stringify(['super.admin']));
    // if (localStorage.getItem('isLoggedin')) {
    //   //const res = this.http.setMethod(httpMethods.get).request();
    //   this.router.navigate([this.returnUrl]);
    // }

    this.isLoading = true;
    e.preventDefault();

    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('permissions', JSON.stringify(['super.admin']));
    try {
      this.username = this.form.value.username;
      var query = {
        "grantType": "PASSWORD",
        ...(this.form.value.username ? { username: this.form.value.username } : {}),
        ...(this.form.value.password ? { password: this.form.value.password } : {}),
        "clientId": environment.idpClientId
      }
      const res = await this.authService.login(query);
      // @ts-ignore
      if (this.tokenExpired(res?.data?.access_token)) {
        // token expired
        localStorage.removeItem('access_token');
        authStore.access_token = null;
        this.isLoading = false;
        this.router.navigate(['auth/login']);
      } else {
        // @ts-ignore
        localStorage.setItem('access_token', res?.data?.access_token);
        // @ts-ignore
        authStore.access_token = res?.data?.access_token;
        // @ts-ignore
        this.parseJwt(res?.data?.access_token);
        if (localStorage.getItem('isLoggedin')) {
          // this.getAdminUserRolePermissions(this.username);
          this.isLoading = false;
          this.router.navigate([this.returnUrl]);
        }
        // token valid
      }


      // @ts-ignore

    } catch (error: any) {
      this.isLoading = false;
      this.toast.show(error?.data?.errors[0]?.title, 'error');
    }
  }

  parseJwt(token: any) {
    console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));
    const res = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    localStorage.setItem('userId', res.sub);
  }

  eye(e: Event) {
    e.preventDefault();
    this.show = !this.show
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log((Math.floor((new Date).getTime() / 1000)) >= expiry);
    console.log(expiry);
    console.log((Math.floor((new Date).getTime() / 1000)));
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  // async getAdminUserRolePermissions(id: any) {
  //   try {

  //     const response = await this.authService.getAdminUserRolePermissions(id);

  //     var adminUserRole: any = response.data.data.adminUserRole;
  //     if (adminUserRole != null || adminUserRole.length > 0) {
  //       var adminRole = adminUserRole[0].adminRole;

  //       if (adminRole != null) {
  //         var permissions = adminRole.permissions;

  //         if (permissions != null || permissions.length > 0) {
  //           localStorage.setItem('permissions', JSON.stringify(permissions));
  //         }

  //         console.log(localStorage.getItem('permissions'));
  //       }
  //     }

  //   } catch (error: any) {
  //     this.toast.show(error.statusText, "error");
  //   }
  // }

}
