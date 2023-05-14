import { Injectable } from '@angular/core';
import { httpMethods } from "../../../core/enums";
import { HttpService } from "../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    constructor(private http: HttpService) {
    }

    async getSummary() {
        return this.http.setUrl('api/dashboard/summary').setMethod(httpMethods.get).request();
    }

    async getBookingSummaryForPastMonth() {
        return this.http.setUrl('api/dashboard/summary/pastMonthBookings').setMethod(httpMethods.get).request();
    }
}
