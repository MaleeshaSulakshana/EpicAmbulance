import { Injectable } from '@angular/core';
import { httpMethods } from "../../../core/enums";
import { HttpService } from "../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class BookingsService {

    constructor(private http: HttpService) {
    }

    async getBookings() {
        return this.http.setUrl('api/bookings').setMethod(httpMethods.get).request();
    }

    // async createHospital(data: any) {
    //     return this.http.setUrl('api/bookings').setMethod(httpMethods.post).setData(data).request();
    // }

    // async updateHospital(id: any, data: any) {
    //     return this.http.setUrl(`api/bookings/${id}`).setMethod(httpMethods.put).setData(data).request();
    // }

    // async deleteHospital(id: any) {
    //     return this.http.setUrl(`api/bookings/${id}`).setMethod(httpMethods.delete).request();
    // }
}
