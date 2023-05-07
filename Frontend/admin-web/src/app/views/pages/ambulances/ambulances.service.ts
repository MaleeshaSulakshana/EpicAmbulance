import { Injectable } from '@angular/core';
import { httpMethods } from "../../../core/enums";
import { HttpService } from "../../../core/services/http.service";

@Injectable({
    providedIn: 'root',
})
export class AmbulancesService {

    constructor(private http: HttpService) {
    }

    async getAmbulances() {
        return this.http.setUrl('api/ambulances').setMethod(httpMethods.get).request();
    }

    async getAmbulancesByHospitalId(id: string) {
        return this.http.setUrl(`api/ambulances?hospitalId=${id}`).setMethod(httpMethods.get).request();
    }

    async createAmbulance(data: any) {
        return this.http.setUrl('api/ambulances').setMethod(httpMethods.post).setData(data).request();
    }

    async updateAmbulance(id: any, data: any) {
        return this.http.setUrl(`api/ambulances/${id}`).setMethod(httpMethods.put).setData(data).request();
    }

    async deleteAmbulance(id: any) {
        return this.http.setUrl(`api/ambulances/${id}`).setMethod(httpMethods.delete).request();
    }
}

