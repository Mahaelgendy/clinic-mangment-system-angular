import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-delete',
  templateUrl: './doctor-delete.component.html',
  styleUrls: ['./doctor-delete.component.css']
})
export class DoctorDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DoctorDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

}


