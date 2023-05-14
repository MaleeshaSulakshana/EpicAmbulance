import { ambulance } from "../ambulances/ambulance";
import { hospital } from "../hospitals/hospital";
import { appUser } from "../users/app-users/app-users";

export interface booking {
    id?: string;
    name?: string;
    status?: string;
    address?: string;
    tpNumber?: string;
    latitude?: number;
    longitude?: number;
    mapUrl?: string;
    dateTime?: string;
    hospitalId?: string;
    hospital?: hospital;
    ambulanceId?: string;
    ambulance?: ambulance;
    userId?: string;
    user?: appUser;
}
