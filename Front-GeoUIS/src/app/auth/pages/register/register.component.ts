import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  register() {
    console.log(this.miFormulario.value);
    const {nombre, correo, password} = this.miFormulario.value;

    this.authService.register(nombre, correo, password)
    .subscribe(ok=>{
      if(ok === true) {
        this.router.navigateByUrl('/inicio'); 
      } else {
        Swal.fire('Error', ok, 'error')
      }
    });
    
  }

}
