import { Injectable } from '@angular/core';
import { httpMethods } from "../../../../core/enums";
import { HttpService } from "../../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class SystemUsersService {

    constructor(private http: HttpService) {
    }

    async getSystemUsers() {
        return this.http.setUrl('api/systemUsers').setMethod(httpMethods.get).request();
    }

    async createSystemUser(data: any) {
        return this.http.setUrl('api/systemUsers').setMethod(httpMethods.post).setData(data).request();
    }

    async updateSystemUser(id: any, data: any) {
        return this.http.setUrl(`api/systemUsers/${id}`).setMethod(httpMethods.put).setData(data).request();
    }

    async deleteSystemUser(id: any) {
        return this.http.setUrl(`api/systemUsers/${id}`).setMethod(httpMethods.delete).request();
    }
}

