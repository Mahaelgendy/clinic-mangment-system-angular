import { Time } from "@angular/common";
import { ClinicModels } from "./clinic-models";
import { Doctors } from "./doctors";
import { Employee } from "./employee";
import { AppointmentStatus, ReservationMethod } from "./Enums";
import { Patients } from "./patients";

export class Appointment {
    constructor(
        public _id:number,
        public clinic_id:ClinicModels | null,
        public patient_id:Patients | null,
        public doctor_id:Doctors | null,
        public employee_id:Employee | null,
        public date:string,
        public from:string,
        public to:string,
        public status:AppointmentStatus,
        public reservation_method?: ReservationMethod,
      ){}
}

