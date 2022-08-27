import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Front-GeoUIS';

  get usuario() {
    return this.authService.usuario
  }

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    console.log("onChange");
    
    if (Object.keys(this.usuario).length != 0) {
      this.authService.validarTokenAdmin()
        .subscribe();
    }
  }
}
