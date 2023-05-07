import { Injectable } from '@angular/core';
import { httpMethods } from "../../../../core/enums";
import { HttpService } from "../../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class AppUsersService {

    constructor(private http: HttpService) {
    }

    async getAppUsers() {
        return this.http.setUrl('api/users').setMethod(httpMethods.get).request();
    }

    // async createAppUser(data: any) {
    //     return this.http.setUrl('api/users').setMethod(httpMethods.post).setData(data).request();
    // }

    // async updateAppUser(id: any, data: any) {
    //     return this.http.setUrl(`api/users/${id}`).setMethod(httpMethods.put).setData(data).request();
    // }

    // async deleteAppUser(id: any) {
    //     return this.http.setUrl(`api/users/${id}`).setMethod(httpMethods.delete).request();
    // }
}

