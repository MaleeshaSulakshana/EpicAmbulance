import { Injectable } from '@angular/core';
import { httpMethods } from "../../../core/enums";
import { HttpService } from "../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    constructor(private http: HttpService) {
    }

    async getSystemUserProfileDetails(id: string) {
        return this.http.setUrl(`api/systemUsers/${id}`).setMethod(httpMethods.get).request();
    }

    async getHospitalUserProfileDetails(id: string) {
        return this.http.setUrl(`api/hospitalUsers/${id}`).setMethod(httpMethods.get).request();
    }

    async updateSystemUserProfile(id: any, data: any) {
        return this.http.setUrl(`api/systemUsers/${id}`).setMethod(httpMethods.put).setData(data).request();
    }

    async updateHospitalUserProfile(id: any, data: any) {
        return this.http.setUrl(`api/hospitalUsers/${id}`).setMethod(httpMethods.put).setData(data).request();
    }
}
