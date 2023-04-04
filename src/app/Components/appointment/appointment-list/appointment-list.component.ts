import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Appointment } from 'src/app/Models/appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  appointments:Appointment[]=[];
  role : string| null;
  isEmployeeOrPatient: boolean=false;

  constructor(public appointmentService:AppointmentService){
    this.role = sessionStorage.getItem('role');
  }
  ngOnInit(){
    if(this.role == 'employee' || this.role =="patient"){
      this.isEmployeeOrPatient=true;
    }
    this.appointmentService.getAllAppointments().subscribe(data=>{
      this.appointments = data;
      console.log(this.appointments);
    })
    
  }
}
