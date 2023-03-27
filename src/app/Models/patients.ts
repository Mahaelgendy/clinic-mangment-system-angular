import { PatientStatus } from "./PatientStatus";

export class Patients {
    constructor (
        public status:PatientStatus,
        public history:string,
        public height:number,
        public weight:number,
        public hasInsurance:boolean,
        public phone:number,
        public patientData: any |null,
        public email:string,
        public _id? :number 
        ){}
}


