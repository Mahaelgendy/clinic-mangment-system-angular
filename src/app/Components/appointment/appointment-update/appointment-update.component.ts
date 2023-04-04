import { Component } from '@angular/core';
import { ClinicModels } from '../../../Models/clinic-models';
import { Patients } from '../../../Models/patients';
import { Doctors } from '../../../Models/doctors';
import { Employee } from '../../../Models/employee';
import { AppointmentStatus, ReservationMethod } from '../../../Models/Enums';
import { FormGroup, FormControl,FormBuilder, Validators   } from '@angular/forms';
import { AppointmentService } from '../../../Services/appointment.service';
import { PatientsService } from '../../../Services/patients.service';
import { ClinicService } from '../../../Services/clinic.service';
import {DoctorsService} from '../../../Services/doctors.service';
import {ScheduleService} from '../../../Services/schedule.service';
import{EmployeeService} from '../../../Services/employee.service';
import { Appointment } from '../../../Models/appointment';
import { Schedules } from '../../../Models/schedules';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.css']
})
export class AppointmentUpdateComponent {

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
      date: ['', Validators.required],
      from: ['', Validators.required],
      status: ['', Validators.required],
      reserMethod: ['', Validators.required]
    });
  }
  get f() { return this.appointmentForm.controls; }

  ngOnInit(){
    if(sessionStorage.getItem('role')== 'employee' || sessionStorage.getItem('role')== 'patient'){
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
    else{
      this.router.navigate(['notFound']);
    }
    
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      return;
    }
    else{
      const appointment =  Appointment.fromFormValues(this.appointmentForm.value);
      appointment._id = this.appointment._id;

      console.log(appointment)
      this.appointmentService.edit(appointment).subscribe(
        (response) => {
          console.log('updated appointment:', response);
        },
        (error) => {
          console.error('Error adding appointment:', error);
        }
        );
        console.log('Form submitted successfully!');
        this.router.navigate(['/appointment']);
      }
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
    this.from=[];
    this.getSceduleTimes(this.selectedDate);
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

  onSelectDoctorChange(){
    this.dates=[];
    this.from=[];
    this.appointmentTime="";
    this.getSchedule(this.SelectedDoctor);
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
