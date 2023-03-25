import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-managment-system';

  ismenuerequired=false;
  constructor(private router:Router)
  {

  }

  ngDoCheck():void {

    let currenturl= this.router.url;
    if(currenturl=='/login'|| currenturl=='/register')
    {
      this.ismenuerequired=false;
    }
    else
    {
      this.ismenuerequired=true;
    }
  }
}
