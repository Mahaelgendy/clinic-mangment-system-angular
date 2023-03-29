import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core/core.module';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './Components/register/register.component'
import {PatientListComponent} from './Components/patient/patient-list/patient-list.component'
import {DoctorModule} from './Components/doctor/doctor.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { ConfirmDeleteDialogComponent } from './Components/confirm-delete-dialog/confirm-delete-dialog.component';
import { AuthIntercepentorService } from './Services/auth-intercepentor.service';
import { LandingPagesModule } from './landing-pages/landing-pages.module';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NotFoundComponent,
    RegisterComponent,
    PatientListComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DoctorModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot()
    CoreModule,
    MaterialModule,
    LandingPagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepentorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
