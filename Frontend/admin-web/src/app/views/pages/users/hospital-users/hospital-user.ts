import { hospital } from "../../hospitals/hospital";

export interface hospitalUser {
    id?: string;
    name?: string;
    address?: string;
    nic?: string;
    tpNumber?: string;
    hospitalId?: string;
    hospital?: hospital;
}
