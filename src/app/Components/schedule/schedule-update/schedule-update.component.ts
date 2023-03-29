import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Schedules } from 'src/app/Models/schedules';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { ScheduleService } from 'src/app/Services/schedule.service';
@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styleUrls: ['./schedule-update.component.css']
})
export class ScheduleUpdateComponent {

  
  scheduleData: any;
  editForm: FormGroup = new FormGroup({});
  newFromFormat:any;
  newToFormat:any;
  schedules: Schedules[] = [];
  clinics: ClinicModels[] =[];
  doctors: Doctors[] = [];
  DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
  dateValidationMessages = {
    required: 'Date is required.',
    pattern: 'Invalid date format. Please enter a date in the format yyyy-mm-dd.'
  };
  timeValidationMessages = {
    required: 'Time is required.',
    pattern: 'Please enter a valid time in the format hh:mm:ss.'
  };
  

  constructor(public scheduleService: ScheduleService,public clinicService:ClinicService ,
    public doctorService: DoctorsService, public router: Router, public builder: FormBuilder, public activatedRoute: ActivatedRoute) { 
      this.editForm = this.builder.group({
        _id:0,
        doc_id:this.builder.control(null,[Validators.required]),
        clinic_id:this.builder.control(null,[Validators.required]),
        date:this.builder.control('',[Validators.required,Validators.pattern(this.DATE_REGEX)]),
        from:this.builder.control('00:00:00',[Validators.required,Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$')]),
        to:this.builder.control('00:00:00',[Validators.required,Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$') ]),
        duration_in_minutes:this.builder.control(0,[Validators.required]),


      });

    }

    ngOnInit(){
      this.activatedRoute.params.subscribe(param => {
        this.scheduleService.getScheduleByID(param['id']).subscribe(data => {
          console.log(data)
          this.scheduleData = data;
          console.log(this.scheduleData.from.split('T')[1].split('.')[0])
          this.newFromFormat=this.scheduleData.from.split('T')[1].split('.')[0];
          this.newToFormat=this.scheduleData.to.split('T')[1].split('.')[0];

          this.editForm.patchValue({
            _id:this.scheduleData?._id,
            doc_id:this.scheduleData?.doc_id,
            clinic_id:this.scheduleData?.clinic_id,
            date:this.scheduleData?.date,
            from:this.newFromFormat,
            to:this.newToFormat,
            duration_in_minutes:this.scheduleData?.duration_in_minutes,
    
          });
        
  
        })
      })

    
        this.clinicService.getAll().subscribe(data=>{
          this.clinics = data;
        });
        
        this.doctorService.getAllDoctors().subscribe(data=>{
          this.doctors = data;
          console.log(data)
        })
    }

    
    save(formData: any) {
      console.log("==========")
     console.log(formData.value)
      if (this.editForm.errors) {
        return;
      }
  
     if (this.editForm.valid) {
    
        this.scheduleService.updateSchedule(formData.value).subscribe(data => {
          
          this.router.navigateByUrl("/schedules");
  
        });
  
      }
    }
}
