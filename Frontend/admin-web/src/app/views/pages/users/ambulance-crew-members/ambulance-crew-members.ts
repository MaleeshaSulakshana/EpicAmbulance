import { ambulance } from "../../ambulances/ambulance";
import { hospital } from "../../hospitals/hospital";

export interface ambulanceCrewMember {
    id?: string;
    name?: string;
    address?: string;
    nic?: string;
    tpNumber?: string;
    hospitalId?: string;
    hospital?: hospital;
    ambulanceId?: string;
    ambulance?: ambulance;
}
