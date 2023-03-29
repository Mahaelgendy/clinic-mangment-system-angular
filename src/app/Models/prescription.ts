import { Doctors } from "./doctors";

export class Prescription {
    constructor(
        public diagnosis:string,
        public currentExamination:string,
        public nextExamination:string,
        public doctor_id : any |null,
        public patient_id : any |null,
        public medicine_id:any | null,
        public _id?:number,
    ){}
}
