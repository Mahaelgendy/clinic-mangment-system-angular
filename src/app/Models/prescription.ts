export class Prescription {
    constructor(
        public _id:number,
        public diagnosis:string,
        public currentExamination:string,
        public nextExamination:string,
        public doctor_id:number,
        public patient_id :number,
        public medicine_id:number
    ){}
}
