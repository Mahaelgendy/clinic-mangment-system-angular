import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/Models/appointment';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Employee } from 'src/app/Models/employee';
import { AppointmentStatus, ReservationMethod } from 'src/app/Models/Enums';
import { Patients } from 'src/app/Models/patients';
import { Schedules } from 'src/app/Models/schedules';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientsService } from 'src/app/Services/patients.service';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent {
  appointment!:Appointment;
  appointmentId:number =0;

  clinics: ClinicModels[] =[];
  patients : Patients[] =[];
  doctors : Doctors[] =[];
  employees : Employee[]=[];
  schedules : Schedules[]= [];
  from : string[]=[];
  dates : string[]=[];
  reservedAppointment : Appointment[]= [];
  selectedDate: string = "";
  SelectedDoctor: number  = 0 ;
  SelectedClinicId: number = 0;
  appointmentTime : string = "";
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
     public doctorService: DoctorsService, public employeeService:EmployeeService,
      public scheduleService: ScheduleService,private fb: FormBuilder,private router: Router, private activatedRoute:ActivatedRoute)
  {
    this.appointmentForm = this.fb.group({
      clinics: [{value: '', disabled: true}, Validators.required,],
      patients: [{value: '', disabled: true}, Validators.required],
      doctors: [{value: '', disabled: true}, Validators.required],
      employees: [{value: '', disabled: true}],
      date: [{value: '', disabled: true}, Validators.required],
      from: [{value: '', disabled: true}, Validators.required],
      status: [{value: '', disabled: true}, Validators.required],
      reserMethod: [{value: '', disabled: true}, Validators.required]
    });
  }
  get f() { return this.appointmentForm.controls; }

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
    this.activatedRoute.params.subscribe((a)=>{
      this.appointmentId = a['id'];
      this.appointmentService.getAppointmentById(a['id']).subscribe(data=>{
        console.log(data)
        this.appointment = data;
        console.log(this.appointment)
        this.getSchedule(this.appointment.doctor_id?._id);
          

        this.appointmentForm.setValue({
          clinics: data.clinic_id.clinicName || '',
          patients: data.patient_id?.patientData?.fullName || '',
          doctors: data.doctor_id?.userData?.fullName || '',
          employees :data.employee_id?.employeeData?.fullName || '',
          date: data.date,
          from : data.from || '',
          status : data.status.toString() || '',
          reserMethod: data.reservation_method?.toString() || ''
        });

      })
    })
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }
  getDates(){
    this.schedules.forEach(
      schedule=> this.dates.push(schedule.date) 
    )
  }
  private getSceduleTimes(date:string) {
    var selectedSchedule = this.schedules.find(x => x.date == date);
    this.appointmentService.getbyQueryString(`date=${date}`).subscribe(
      appoinments => {
        this.reservedAppointment = appoinments;
        this.from = this.getTimeRange(selectedSchedule?.from, selectedSchedule?.to, selectedSchedule?.duration_in_minutes);
        
        if(this.isString(this.SelectedDoctor) || this.appointment.doctor_id?._id == this.SelectedDoctor){
          const now = new Date(this.appointment.from);
          this.appointmentTime = now.toLocaleTimeString("en-US", { hour12: false });
          this.from.push(this.appointmentTime);
        }
      });
  }
  
  private getSchedule(docotrId:number | undefined) {
    this.scheduleService.getbyQueryString(`clinicId=1&doctorId=${docotrId}`).subscribe(
      schedules => {
        this.schedules = schedules;
        this.getDates();
        this.getSceduleTimes(this.appointment.date);
      }
    );
  }

  getTimeRange(start: any, end: any, selectedDuration: any): string[] {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const timeDiff = endTime.getTime() - startTime.getTime();
    const times: string[] = [];
    let isReserved=false;

    for (let i = 0; i <= timeDiff -selectedDuration * 60 * 1000 ; i += selectedDuration * 60 * 1000) {
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
