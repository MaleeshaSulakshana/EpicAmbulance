import { Injectable } from '@angular/core';
import { httpMethods } from "../../../../core/enums";
import { HttpService } from "../../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class HospitalUsersService {

    constructor(private http: HttpService) {
    }

    async getHospitalUsers() {
        return this.http.setUrl('api/hospitalUsers').setMethod(httpMethods.get).request();
    }

    async createHospitalUser(data: any) {
        return this.http.setUrl('api/hospitalUsers').setMethod(httpMethods.post).setData(data).request();
    }

    async updateHospitalUser(id: any, data: any) {
        return this.http.setUrl(`api/hospitalUsers/${id}`).setMethod(httpMethods.put).setData(data).request();
    }

    async deleteHospitalUser(id: any) {
        return this.http.setUrl(`api/hospitalUsers/${id}`).setMethod(httpMethods.delete).request();
    }
}

