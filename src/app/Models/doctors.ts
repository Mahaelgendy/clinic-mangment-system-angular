import { User } from "./user";

export class Doctors {

  constructor(
    public userData: User|null,
    public specialization:string,
    public price:number,
    public phone:string,
    public _id?:number,
  ){}

}
