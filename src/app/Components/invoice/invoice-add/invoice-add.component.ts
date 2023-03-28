import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Doctors } from 'src/app/Models/doctors';
import { Employee } from 'src/app/Models/employee';
import { Patients } from 'src/app/Models/patients';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { EmployeeService } from 'src/app/Services/employee.service';
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

  doctorList!:Doctors[];
  selectedDoctor!:Doctors;
  doctor_id!:number;
  patient!:Patients;
  employee!:Employee;

  selectedOption = new FormControl();
  searchInput = new FormControl();
  searchText!:string;


  patientSearch = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  patientSearchText!:string;
  patientName!: string;

  showError = false;
  constructor(
    public doctorService:DoctorsService,
    public patientService:PatientsService,
    public employeeService:EmployeeService,
    public clinicService:ClinicService,
    public serviceService:ServiceService,
    public appointmentService:AppointmentService,
    public activatedRoute:ActivatedRoute,
    public route:Router
  ){
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0,0,0,0);
    this.today = date.toISOString().substring(0,10);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    console.log(hours)
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}:${seconds}`;
  }

  ngOnInit(){
    this.doctorService.getAllDoctors().subscribe(res=>{
      this.doctorList = res;
    })
    console.log(this.selectedOption)

    this.selectedOption.valueChanges.pipe(debounceTime(200)).subscribe(docId=>{
      this.doctor_id = docId;
      console.log(this.doctor_id);
      this.searchInput.reset();
      this.searchText=''
    });

    // this.activatedRoute.params.subscribe(param=>{
    //   this.employeeService.getEmployeeById(param['id']).subscribe(data=>{
    //     this.employee = data;
    //   })
    // })


    this.patientSearch.valueChanges
      .subscribe(
        searchResults => {
          console.log(this.patientName)
          this.patientName = searchResults??'';
        },
        error => {
          console.error(error);
        }
      );

  }


  search() {
    this.patientService.getPatientByName(this.patientName).subscribe(
      searchResults => {
        console.log(this.patientSearch);
        if(searchResults!=null){
          // console.log(searchResults);
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

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
