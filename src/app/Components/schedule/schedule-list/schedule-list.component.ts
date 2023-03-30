import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedules } from 'src/app/Models/schedules';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent {

  deleteModal = false;
  deletedId = 0;  

  schedules:Schedules[]=[];
  constructor(public scheduleService:ScheduleService, public activatedRoute:ActivatedRoute,private router: Router){

  }
  ngOnInit(){
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'doctor'){
      this.scheduleService.getAllSchedules().subscribe(data=>{
        this.schedules=data;
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }

  deleteDialog(id:number| undefined = 0) {
    console.log(id)
    this.deletedId = id;
    this.deleteModal = true;
  }

  delete(id: number) {
      this.scheduleService.deleteScheduleByID(id).subscribe(data => {
        console.log(data);
        this.deleteModal = false;
        location.reload();

      })
  }

 
}
