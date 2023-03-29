import { Component } from '@angular/core';
import { Schedules } from 'src/app/Models/schedules';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-shcedule-list',
  templateUrl: './shcedule-list.component.html',
  styleUrls: ['./shcedule-list.component.css']
})
export class ShceduleListComponent {
  allSchedules : Schedules[] =[];
  constructor(private shceduleService :ScheduleService){

  }
  ngOnInit(){
    this.shceduleService.getAllSchedules().subscribe(shc =>{
     this.allSchedules= shc;
     console.log(shc[0].doc_id);
    })

  }
}
