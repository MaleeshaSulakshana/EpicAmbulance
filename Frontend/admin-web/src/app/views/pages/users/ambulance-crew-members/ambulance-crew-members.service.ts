import { Injectable } from '@angular/core';
import { httpMethods } from "../../../../core/enums";
import { HttpService } from "../../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class AmbulanceCrewMembersService {

    constructor(private http: HttpService) {
    }

    async getAmbulanceCrewMembers() {
        return this.http.setUrl('api/ambulanceCrewMembers').setMethod(httpMethods.get).request();
    }

    async createAmbulanceCrewMember(data: any) {
        return this.http.setUrl('api/ambulanceCrewMembers').setMethod(httpMethods.post).setData(data).request();
    }

    async updateAmbulanceCrewMember(id: any, data: any) {
        return this.http.setUrl(`api/ambulanceCrewMembers/${id}`).setMethod(httpMethods.put).setData(data).request();
    }

    async deleteAmbulanceCrewMember(id: any) {
        return this.http.setUrl(`api/ambulanceCrewMembers/${id}`).setMethod(httpMethods.delete).request();
    }
}

