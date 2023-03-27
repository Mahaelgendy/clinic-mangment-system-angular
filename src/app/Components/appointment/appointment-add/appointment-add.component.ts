import { Component } from '@angular/core';
import { ClinicModels } from '../../../Models/clinic-models';
import { Patients } from '../../../Models/patients';
import { Doctors } from '../../../Models/doctors';
import { Employee } from '../../../Models/employee';
import { AppointmentStatus, ReservationMethod } from '../../../Models/Enums';
import { FormGroup, FormControl } from '@angular/forms';
import { AppointmentService } from '../../../Services/appointment.service';
import { PatientsService } from '../../../Services/patients.service';
import { ClinicService } from '../../../Services/clinic.service';
import {DoctorsService} from '../../../Services/doctors.service';
import {ScheduleService} from '../../../Services/schedule.service';
import{EmployeeService} from '../../../Services/employee.service';
import { Appointment } from '../../../Models/appointment';
import { Schedules } from '../../../Models/schedules';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent {
  
  clinics: ClinicModels[] =[];
  patients : Patients[] =[];
  doctors : Doctors[] =[];
  employees : Employee[]=[];
  schedules : Schedules[]= [];
  appointmentStatus = Object.values(AppointmentStatus);
  reserMethod = Object.values(ReservationMethod);

  appointmentForm = new FormGroup({
    clinics: new FormControl(''),
    patients: new FormControl(''),
    doctors: new FormControl(''),
    employees: new FormControl(''),
    date: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
    status: new FormControl(''),
    reserMethod: new FormControl('')
  });

  constructor(public appointmentService: AppointmentService,public clinicService:ClinicService ,public patientService: PatientsService,
     public doctorService: DoctorsService, public employeeService:EmployeeService, public scheduleService: ScheduleService)
  {
      
  }
  ngOnInit(){
    this.clinicService.getAll().subscribe(data=>{
      this.clinics = data;
    });
    this.patientService.getAllPatients().subscribe(data=>{
      this.patients = data;
    })
    this.doctorService.getAllDoctors().subscribe(data=>{
      this.doctors = data;
    })
    this.employeeService.getAllEmployees().subscribe(data=>{
      this.employees = data;
    })
    this.scheduleService.getbyQueryString('').subscribe(
      schedules => {
        this.schedules =schedules;
      },
      error => {
        // handle error
      }
    );
  }
  onSubmit() {
    console.log(this.appointmentForm.value);
    const appointment =  Appointment.fromFormValues(this.appointmentForm.value);
    console.log(appointment)
    this.appointmentService.add(appointment).subscribe(
      (response) => {
        console.log('Added appointment:', response);
      },
      (error) => {
        console.error('Error adding appointment:', error);
      }
    );
  }
  isString(value: any): boolean {
    return typeof value === 'string';
  }
}
