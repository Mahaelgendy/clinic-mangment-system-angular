import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PanelComponent } from './panel/panel.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    TopbarComponent
  ]
})
export class CoreModule { }
