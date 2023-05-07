import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from '../../../../environments/environment';

import axios, {AxiosError, AxiosResponse} from "axios";
import { httpMethods } from "src/app/core/enums";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private idpUrl: string = environment.idpUrl;

    constructor(public router: Router,private http : HttpService) {}

    async login(data:any) {
        return new Promise(async (resolve, reject) => {
            axios.post(this.idpUrl + '/login', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                console.log(error.response);
                reject(error.response);
            })
        });

    }

    async forgetPassword(data:any) {

        return new Promise(async (resolve, reject) => {
            axios.post(this.idpUrl + '/user/forgot/password/init', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                console.log(error.response);
                reject(error.response);
            })
        });

    }

    async forgetPasswordNext(data:any) {

        return new Promise(async (resolve, reject) => {
            axios.post(this.idpUrl + '/user/forgot/password', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                console.log(error.response);
                reject(error.response);
            })
        });

    }

    async changePassword(data:any) {

        return new Promise(async (resolve, reject) => {
            axios.patch(this.idpUrl + '/user/password/change', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                console.log(error.response);
                reject(error.response);
            })
        });

    }
    async otpVerify(data:any) {

        return new Promise(async (resolve, reject) => {
            axios.post(this.idpUrl + '/user/forgot/password/verify', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                console.log(error.response);
                reject(error.response);
            })
        });

    }

    async getAdminUserRolePermissions(id: any) {
        return this.http.setUrl(`api/v1/user/adminUserRolePermissions/${id}`).setMethod(httpMethods.get).request();
    }
}