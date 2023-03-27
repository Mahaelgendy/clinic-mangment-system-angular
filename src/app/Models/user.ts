import { Address } from "./address";
import { Gender, Role } from "./Enums";

export class User {
    constructor(

        public fullName :string,
        public password :string,
        public email : string,
        public age : number,
        public address : Address,
        public gender : Gender,
        public role : Role ,
        public image ?: File,
        public _id? :number,
    )
    {}
}
