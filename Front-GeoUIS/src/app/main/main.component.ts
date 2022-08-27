import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  get usuario() {
    return this.authService.usuario
  }

  constructor( private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

  }


}
