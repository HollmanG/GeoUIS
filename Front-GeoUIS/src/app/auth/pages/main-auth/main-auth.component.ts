import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.css']
})
export class MainAuthComponent implements OnInit {

  get usuario() {
    return this.authService.usuario
  }

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    if (Object.keys(this.usuario).length != 0) {
      this.authService.validarTokenAdmin()
        .subscribe();
    }
  }

}
