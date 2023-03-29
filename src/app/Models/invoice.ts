import { PaymentMethod, PaymentStatus } from "./Enums";

export class Invoice {
  constructor(
    public doctorId:any,
    public patientId:any,
    public employeeId:any,
    public appointmentId:any,
    public clinicId:any,
    public serviceId:any,
    public paymentMethod:PaymentMethod,
    public paymentStatus:PaymentStatus,
    public totalCost:number,
    public actualPaid:number,
    public date:string,
    public time:string,
    public transaction_id?:string,
    public _id?:number,
  ){}
}
