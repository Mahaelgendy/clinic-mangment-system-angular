import { User } from "./user";

export class Doctors {

  constructor(
    public _id:number,
    public userData: User,
    public specialization:string,
    public price:number
  ){}

}
