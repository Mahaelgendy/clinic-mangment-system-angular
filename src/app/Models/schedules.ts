import { ClinicModels } from "./clinic-models";
import { Doctors } from "./doctors";


export class Schedules {

    constructor(
        public doc_id:any,
        public clinic_id:any,
        public date:string ,
        public from:string,
        public to :string,
        public duration_in_minutes:number ,
        public  _id?: number
    ) {}
}
