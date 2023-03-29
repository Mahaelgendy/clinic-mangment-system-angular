import { Component  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Schedules } from 'src/app/Models/schedules';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { ScheduleService } from 'src/app/Services/schedule.service';
@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent {
  public schecduleForm ! : FormGroup;
  public allClinic :ClinicModels [] = [];
  public shcedule! : Schedules;
  public doctorId:number =1;
  public allDoctors :Doctors[]=[];

   DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  constructor(private scheduleService :ScheduleService,
    private clinicServices : ClinicService,
    private doctorService :DoctorsService,
    private routee:Router,
    private route :ActivatedRoute,
   )
  {
    this.schecduleForm = new FormGroup({
      clinic_id: new FormControl('', [Validators.required]),
      doc_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required,Validators.pattern(this.DATE_REGEX)]),
      from: new FormControl('', [Validators.required,Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$') ]),
      to: new FormControl('', [Validators.required,Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$') ]),
      duration_in_minutes: new FormControl('', [Validators.required])
    })
  }
  
  ngOnInit(){
    this.clinicServices.getAll().subscribe(clinic =>{
      this.allClinic = clinic;
      console.log(this.allClinic)
    })
    this.doctorService.getAllDoctors().subscribe(doctor=>{
       this.allDoctors = doctor;
      // console.log(doctor[0].userData?.fullName);
    })
  }
  submit(){
    console.log(this.schecduleForm.value);
  
      this.shcedule= new Schedules(
        parseInt(this.schecduleForm.get('doc_id')?.value),
        parseInt(this.schecduleForm.get('clinic_id')?.value),
        this.schecduleForm.get('date')?.value,
        this.schecduleForm.get('from')?.value,
        this.schecduleForm.get('to')?.value,
        this.schecduleForm.get('duration_in_minutes')?.value);
        this.scheduleService.addSchedule(this.shcedule).subscribe(x=>
          alert("done")
        )
// console.log("-----")
//      console.log(this.shcedule);
    
  }
  getControl(fullName:any |undefined): AbstractControl |null
  {
    return this.schecduleForm.get(fullName);
  }
}
