import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

  invoiceFrom!:FormGroup;
  today!:string;
  time!: string;

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

  doctorList!:Doctors[];
  servicesList!:Service[];
  appointmentList!:Appointment[];

  selectedOption = new FormControl();
  searchInput = new FormControl();
  searchText!:string;

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
    public route:Router
  ){

    this.invoiceFrom = new FormGroup({
      doctor_id:new FormControl('', Validators.required),
      patient_id:new FormControl('', Validators.required),
      employee_id:new FormControl('', Validators.required),
      appointment_id:new FormControl('', Validators.required),
      clinic_id:new FormControl('', Validators.required),
      service_id:new FormControl('', Validators.required),
      paymentMethod:new FormControl('', Validators.required),
      paymentStatus:new FormControl('', Validators.required),
      totalCost:new FormControl('', Validators.required),
      actualPaid:new FormControl('', Validators.required),
      date:new FormControl('', Validators.required),
      time:new FormControl('', Validators.required),
    })


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

    this.doctorService.getAllDoctors().subscribe(res=>{
      console.log("00000")
      this.doctorList = res;
      console.log(this.doctorList)
    })

    this.selectedOption.valueChanges.pipe(debounceTime(200)).subscribe(docId=>{
      this.doctor_id = docId;
      this.searchInput.reset();
      this.searchText=''
      this.doctorService.getDoctorByID(this.doctor_id).subscribe(doc=>{
        console.log(doc)
        this.targetDoctor = doc;
      })
    });


    this.serviceService.getAll().subscribe(ser=>{
      this.servicesList = ser;
    });

    this.serviceOptions.valueChanges.pipe(debounceTime(200)).subscribe(serId=>{
      this.service_id = serId;
      this.serviceInput.reset();
      this.serviceSearchText=''
      this.serviceService.getById(this.service_id).subscribe(service=>{
        this.targetService = service;
        console.log(service)
      })
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


    // this.activatedRoute.params.subscribe(param=>{
    //   this.employeeService.getEmployeeById(param['id']).subscribe(data=>{
    //     this.employee = data;
    //   })
    // })


    this.employeeService.getEmployeeById(3).subscribe(emp=>{
      console.log("From emp subs");
      this.targetemployee = emp;
      this.employee_id = this.targetemployee._id;
      console.log(this.targetemployee)

      this.clinicService.getById(this.targetemployee.clinicId).subscribe(clinic=>{
        console.log("From clinic")
        this.targetClinic = clinic;
        this.clinic_id = this.targetClinic._id;
        console.log(this.targetClinic)

      })
    });

    this.patientSearch.valueChanges
      .subscribe(
        searchResults => {
          console.log(this.patientName)
          this.patientName = searchResults??'';

          this.patientService.getPatientByName(this.patientName).subscribe(
            searchResults => {
              console.log(this.patientSearch);
              if(searchResults!=null){
                console.log(searchResults);
                this.targetPatient = searchResults;
                this.patient_id = this.targetPatient._id??-1;

                this.appointmentService.getbyQueryString({
                  doctorId:this.doctor_id,
                  patientId:this.patient_id,
                  clinicId:this.clinic_id
                }
                ).subscribe(data=>{
                  console.log("From Appointment")
                  console.log(data)
                })
                

              }else{
                this.patientSearch.setErrors({ apiError: true })
                this.showError = true
              }
            },
            error => {
              console.error(error);
            }
          );


        },
        error => {
          console.error(error);
        }
      );

      // this.appointmentService.getbyQueryString({
      //       date:this.today,
      //       doctorId:this.doctor_id,
      //       patientId:this.targetPatient._id,
      //       clinicId:1
      //     }).subscribe(app=>{

      //       console.log("From Appointment subs")
      //       console.log(this.today)
      //       console.log(this.doctor_id)
      //       console.log(this.targetPatient._id)
      //       console.log(this.targetemployee.clinicId)
      //       console.log("-------------------")
      //       this.targetAppointment = app[0];
      //       console.log(this.targetAppointment)
      //     });

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

    console.log(`paystat ${this.paystat}`)
    this.invoiceFrom.value.doctor_id = this.doctor_id;
    this.invoiceFrom.value.patient_id = this.patient_id;
    this.invoiceFrom.value.employee_id = this.employee_id;
    this.invoiceFrom.value.appointment_id = 9;
    this.invoiceFrom.value.clinic_id = this.clinic_id;
    this.invoiceFrom.value.service_id = this.service_id;
    this.invoiceFrom.value.paymentMethod= this.paymethod;
    this.invoiceFrom.value.paymentStatus = this.paystat;
    this.invoiceFrom.value.totalCost = this.targetDoctor.price;
    this.invoiceFrom.value.actualPaid = this.actpaid;
    this.invoiceFrom.value.date = this.today;
    this.invoiceFrom.value.time = this.time;

    console.log("___________________________________")
    console.log(this.invoiceFrom.value);

    const newInvoice = new Invoice(
      this.invoiceFrom.value.doctor_id,
      this.invoiceFrom.value.patient_id,
      this.invoiceFrom.value.employee_id,
      this.invoiceFrom.value.appointment_id,
      this.invoiceFrom.value.clinic_id,
      this.invoiceFrom.value.service_id,
      this.invoiceFrom.value.paymentMethod,
      this.invoiceFrom.value.paymentStatus,
      this.invoiceFrom.value.totalCost,
      this.invoiceFrom.value.actualPaid,
      this.invoiceFrom.value.date,
      this.invoiceFrom.value.time
    )
    // const newInvoice = new Invoice(
    //   5,
    //   2,
    //   4,
    //   6,
    //   1,
    //   1,
    //   this.invoiceFrom.value.paymethod,
    //   this.invoiceFrom.value.paymentStatus,
    //   this.invoiceFrom.value.totalCost,
    //   this.invoiceFrom.value.actualPaid,
    //   this.invoiceFrom.value.data,
    //   this.invoiceFrom.value.time
    // )

    this.invoiceService.addInvoice(newInvoice).subscribe(data=>{
      console.log("finished");
    })

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
