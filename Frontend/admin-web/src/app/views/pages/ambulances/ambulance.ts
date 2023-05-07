import { hospital } from "../hospitals/hospital";

export interface ambulance {
    id?: string;
    vehicleNo?: string;
    type?: string;
    availableStatus?: boolean;
    hospitalId?: string;
    hospital?: hospital;
}
