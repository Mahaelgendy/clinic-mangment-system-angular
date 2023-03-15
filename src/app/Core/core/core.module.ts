import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PanelComponent } from './panel/panel.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
