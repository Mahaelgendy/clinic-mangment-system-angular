import { User } from "./user";

export class Employee {
    constructor( 
        public _id:number,
        public employeeData:User, 
        public clinicId:number,
        public salary:number,
        public phone:number,
        public position:string 
    ){}
}
