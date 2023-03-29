import { Time } from "@angular/common";
import { ClinicModels } from "./clinic-models";
import { Doctors } from "./doctors";
import { Employee } from "./employee";
import { AppointmentStatus, ReservationMethod } from "./Enums";
import { Patients } from "./patients";

export class Appointment {
    constructor(
        public _id:number,
        public clinic_id:ClinicModels ,
        public patient_id:Patients | null,
        public doctor_id:Doctors | null,
        public employee_id:Employee | null,
        public date:string,
        public from:string,
        public to:string,
        public status:AppointmentStatus,
        public reservation_method?: ReservationMethod,
      ){}
      
      static fromFormValues(formValues: any): Appointment {
        return new Appointment(
          formValues._id,
          formValues.clinics,
          formValues.patients,
          formValues.doctors,
          formValues.employees,
          formValues.date,
          formValues.from,
          formValues.to,
          formValues.status,
          formValues.reserMethod,
        );
      }
}

