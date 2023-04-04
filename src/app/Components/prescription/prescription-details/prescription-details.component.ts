import { Component ,Input  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Prescription } from 'src/app/Models/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent {
  private prescriptionId?: number ;
  public prescription!: Prescription;
  constructor( private route : ActivatedRoute,
               private prescriptionService: PrescriptionService ,
               private router: Router){
    this.route.params.subscribe((params: Params) => {
      this.prescriptionId = params['id'];
   });
  }
  ngOnInit(){
    if(sessionStorage.getItem('role')== 'doctor'||
      sessionStorage.getItem('role')== 'admin'||
      sessionStorage.getItem('role')== 'patient'){
      if(this.prescriptionId != undefined){

        this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe(res =>
          {
            this.prescription = res;
          });
      }
    }else{
      this.router.navigate(['notFound']);
    }

  }

}
