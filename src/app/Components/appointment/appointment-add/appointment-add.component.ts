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
  from : string[]=[];
  dates : string[]=[];
  reservedAppointment : Appointment[]= [];
  selectedDate: string = "";
  appointmentStatus = Object.values(AppointmentStatus);
  reserMethod = Object.values(ReservationMethod);

  appointmentForm = new FormGroup({
    clinics: new FormControl(''),
    patients: new FormControl(''),
    doctors: new FormControl(''),
    employees: new FormControl(''),
    date: new FormControl(''),
    from: new FormControl(''),
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
    this.scheduleService.getbyQueryString(`clinicId=1&doctorId=1`).subscribe(
      schedules => {
        this.schedules =schedules;
        console.log(this.schedules);
        this.getDates();
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
  getDates(){
    this.schedules.forEach(
      schedule=> this.dates.push(schedule.date) 
    )
  }
  onSelectDateChange() {
    var selectedSchedule = this.schedules.find(x=>x.date == this.selectedDate);
    this.appointmentService.getbyQueryString(`date=${this.selectedDate}`).subscribe(
      appoinments => {
        this.reservedAppointment =appoinments;
        console.log(this.reservedAppointment);
        this.from= this.getTimeRange(selectedSchedule?.from, selectedSchedule?.to, selectedSchedule?.duration_in_minutes);
      });
  }
  
  getTimeRange(start: any, end: any, selectedDuration: any): string[] {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const timeDiff = endTime.getTime() - startTime.getTime();
    const times: string[] = [];
    let isReserved=false;

    for (let i = 0; i <= timeDiff; i += selectedDuration * 60 * 1000) {
      const currentTime = new Date(startTime.getTime() + i);
          
      for(let j =0 ; j < this.reservedAppointment.length ; j++){
        const date1 = new Date(this.reservedAppointment[j].from);
        const date2 = new Date(currentTime);

        if (date1.getTime() === date2.getTime()) {
            isReserved = true;
            break;
        }
      }
      const timeString = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second:'2-digit',hour12:false});

      if(isReserved == false){
        times.push(timeString);
      }
      isReserved = false;
    }
    return times;
  }
}
