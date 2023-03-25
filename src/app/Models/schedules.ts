import { ClinicModels } from "./clinic-models";
import { Doctors } from "./doctors";


export class Schedules {

    constructor(
        public  _id: number,
        public clinic_id:ClinicModels,
        public doc_id:Doctors,
        public date:string ,
        public from:Date,
        public to :Date,
        public duration_in_minutes:number 
    ) {}
}
