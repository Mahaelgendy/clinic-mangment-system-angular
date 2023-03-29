import { User } from "./user";

export class Employee {
    constructor( 
        public employeeData:User, 
        public clinicId:number,
        public salary:number,
        public phone:number,
        public position:string,
        public _id?:number,
    ){}
}
