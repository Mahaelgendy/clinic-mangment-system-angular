import { ClinicModels } from "./clinic-models";
import { Employee } from "./employee";
import { AppointmentStatus, ReservationMethod } from "./Enums";
import { Patients } from "./patients";

export class Appointment {
    constructor(
        public _id:number,
        public clinic_id:ClinicModels,
        public patient_id:Patients,
        public employee_id:Employee,
        public date:string,
        public from:string,
        public to:string,
        public status:AppointmentStatus,
        public reservation_method?: ReservationMethod,
      ){}
}

