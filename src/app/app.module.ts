import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core/core.module';
import { HeaderComponent } from './Core/core/header/header.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LogOutComponent } from './Components/log-out/log-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './Components/register/register.component'
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './Core/core/topbar/topbar.component'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from 'src/material.module';
import {DoctorModule} from './Components/doctor/doctor.module'
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NotFoundComponent,
    RegisterComponent
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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
