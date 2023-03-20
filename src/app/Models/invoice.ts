import { PaymentMethod, PaymentStatus } from "./Enums";

export class Invoice {
  constructor(
    public _id:number,
    public doctor_id:any,
    public patient_id:any,
    public employee_id:any,
    public appointment_id:any,
    public clinic_id:any,
    public service_id:any,
    public paymentMethod:PaymentMethod,
    public paymentStatus:PaymentStatus,
    public totalCost:number,
    public actualPaid:number,
    public date:string,
    public time:string,
    public transaction_id:string
  ){}
}
