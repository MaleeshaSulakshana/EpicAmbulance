import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from '../../../../environments/environment';

import axios, { AxiosError, AxiosResponse } from "axios";
import { httpMethods } from "src/app/core/enums";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl: string = environment.apiUrl;

    constructor(public router: Router, private http: HttpService) { }

    async login(data: any) {
        return new Promise(async (resolve, reject) => {
            axios.post(this.apiUrl + '/api/auth/login/admin', data)
                .then((response: AxiosResponse) => {
                    resolve(response);
                }).catch((error: AxiosError) => {
                    reject(error.response);
                })
        });

    }

    async getSystemUserDetails(id: any) {
        return this.http
            .setUrl(`api/systemUsers/${id}`)
            .setMethod(httpMethods.get)
            .request();
    }

    async getHospitalUserDetails(id: any) {
        return this.http
            .setUrl(`api/hospitalUsers/${id}`)
            .setMethod(httpMethods.get)
            .request();
    }
}