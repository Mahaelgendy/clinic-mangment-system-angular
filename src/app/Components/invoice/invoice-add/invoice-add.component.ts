import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Appointment } from 'src/app/Models/appointment';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Employee } from 'src/app/Models/employee';
import { Invoice } from 'src/app/Models/invoice';
import { Patients } from 'src/app/Models/patients';
import { Service } from 'src/app/Models/service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { PatientsService } from 'src/app/Services/patients.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent{

  today!:string;
  time!: string;
  error = false;

  targetInvoice!:Invoice;
  targetAppointment!:Appointment;
  targetDoctor!:Doctors;
  targetemployee!:Employee;
  targetPatient!:Patients;
  targetClinic!:ClinicModels;
  targetService!:Service;

  doctor_id!:number;
  clinic_id!:number;
  service_id!:number;
  patient_id!:number;
  employee_id!:number;
  appointment_id!:number;

  doctorList!:Doctors[];
  servicesList!:Service[];
  appointmentList!:Appointment[];

  doctorOption = new FormControl();
  doctorInput = new FormControl();
  doctorText!:string;

  serviceOptions = new FormControl();
  serviceInput = new FormControl();
  serviceSearchText!:string;

  appointmentOptions = new FormControl();
  appointmentInput = new FormControl();
  appointmentSearchText!:string;

  patientSearch = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  patientSearchText!:string;
  patientName!: string;
  showError = false;

  paymentMethods = ['Cash','Credit Card'];
  paymentStatus = [ 'Total amount','Partial with insurance'];

  paymentMethodFC = new FormControl();
  paymentStatusFC = new FormControl();
  actualPaidFC = new FormControl();

  paymethod!:string;
  paystat!:string;
  actpaid!:number;

  constructor(
    public invoiceService:InvoiceService,
    public doctorService:DoctorsService,
    public patientService:PatientsService,
    public employeeService:EmployeeService,
    public clinicService:ClinicService,
    public serviceService:ServiceService,
    public appointmentService:AppointmentService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
  ){
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0,0,0,0);
    this.today = date.toISOString().substring(0,10);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}:${seconds}`;
  }

  ngOnInit(){

    this.getAllDoctors();

    this.doctorOption.valueChanges.pipe(debounceTime(200)).subscribe(docId=>{
      this.doctor_id = docId;
      this.doctorInput.reset();
      this.doctorText=''
      this.getTargetDoctor();
    });

    this.getAllServices();

    this.serviceOptions.valueChanges.pipe(debounceTime(200)).subscribe(serId=>{
      this.service_id = serId;
      this.serviceInput.reset();
      this.serviceSearchText=''
      this.getTargetService();
    })

    this.appointmentOptions.valueChanges.pipe(debounceTime(200)).subscribe(appId=>{
      this.appointment_id = appId;
      this.appointmentInput.reset();
      this.serviceSearchText='';

    })

    this.paymentMethodFC.valueChanges.subscribe(val=>{
      this.paymethod = val;
      console.log(this.paymethod)
    })

    this.paymentStatusFC.valueChanges.subscribe(val=>{
      this.paystat = val;
      console.log(this.paystat)
    })

    this.actualPaidFC.valueChanges.subscribe(val=>{
      this.actpaid = val;
      console.log(this.actpaid)
    })

    this.getTargetEmployee();
    this.getTargetPatient();

  }
  getTargetDoctor(){
    this.doctorService.getDoctorByID(this.doctor_id).subscribe(doc=>{
      console.log(doc)
      this.targetDoctor = doc;
    })

  }

  getAllServices(){
    this.serviceService.getAll().subscribe(ser=>{
      this.servicesList = ser;
    });
  }
  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe(res=>{
      console.log("00000")
      this.doctorList = res;
      console.log(this.doctorList)
    })

  }
  getTargetService(){
    this.serviceService.getById(this.service_id).subscribe(service=>{
      this.targetService = service;
      console.log(service)
    })

  }

  getPatientById(){
    this.patientService.getPatientByName(this.patientName).subscribe(
      searchResults => {
        console.log(this.patientSearch);
        if(searchResults!=null){
          console.log(searchResults);
          this.targetPatient = searchResults;
          this.patient_id = this.targetPatient._id??-1;
          this.getAppointment();
        }else{
          this.patientSearch.setErrors({ apiError: true })
          this.showError = true
        }
      },
      error => {
        console.error(error);
      }
    );

  }

  getAppointment(){
    this.appointmentService.getbyQueryString({
      doctorId:this.doctor_id,
      patientId:this.patient_id,
      clinicId:this.clinic_id
    }
    ).subscribe(data=>{
      console.log("From Appointment")
      console.log(data[0].date)
      this.appointmentList = data;
    })

  }

  getTargetPatient(){
    this.patientSearch.valueChanges
    .subscribe(
      searchResults => {
        this.patientName = searchResults??'';
        this.getPatientById()
      },
      error => {
        console.error(error);
      }
    );
  }

  getTargetClinic(){
    this.clinicService.getById(this.targetemployee.clinicId).subscribe(clinic=>{
      console.log("From clinic")
      this.targetClinic = clinic;
      this.clinic_id = this.targetClinic._id;
      console.log(this.targetClinic)

    })
  }

  getTargetEmployee(){

    this.employeeService.getEmployeeById(3).subscribe(emp=>{
      console.log("From emp subs");
      this.targetemployee = emp;
      this.employee_id = this.targetemployee._id;
      console.log(this.targetemployee)

      this.getTargetClinic();

    });
  }

  search() {
    this.patientService.getPatientByName(this.patientName).subscribe(
      searchResults => {
        console.log(this.patientSearch);
        if(searchResults!=null){
          console.log(searchResults);
          this.targetPatient = searchResults;
          this.patient_id = this.targetPatient._id??-1;
        }else{
          this.patientSearch.setErrors({ apiError: true })
          this.showError = true
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(){
    if(
      (this.doctorOption.valid && this.doctorOption.touched)&&
      (this.serviceOptions.valid && this.serviceOptions.touched)&&
      (this.appointmentOptions.valid && this.appointmentOptions.touched)&&
      (this.patientSearch.valid && this.patientSearch.touched)&&
      (this.paymentMethodFC.valid && this.paymentMethodFC.touched)&&
      (this.paymentStatusFC.valid && this.paymentStatusFC.touched)&&
      (this.actualPaidFC.valid && this.actualPaidFC.touched)
    ){
      const newInvoice = new Invoice(
        this.doctor_id,
        this.patient_id,
        this.employee_id,
        this.appointment_id,
        this.clinic_id,
        this.service_id,
        this.paymentMethodFC.value,
        this.paymentStatusFC.value,
        this.targetDoctor.price+this.targetService.salary,
        this.actpaid,
        this.today,
        this.time
      )

      this.invoiceService.addInvoice(newInvoice).subscribe(data=>{
        this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/invoice']);

        })
      })

      this.error=false
    }else{
      this.error = true;
    }


  }


}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
