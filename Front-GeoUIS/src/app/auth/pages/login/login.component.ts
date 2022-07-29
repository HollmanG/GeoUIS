import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login() {
    console.log(this.miFormulario.value);   
    const {correo, password} = this.miFormulario.value;

    this.authService.login(correo, password)
    .subscribe(ok=>{
      if(ok === true) {
        this.router.navigateByUrl('/inicio'); 
      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
    
  }

}
