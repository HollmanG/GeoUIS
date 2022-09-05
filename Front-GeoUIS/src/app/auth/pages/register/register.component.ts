import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: UntypedFormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService) { }

  // Register method 
  register() {
    console.log(this.miFormulario.value);
    const { nombre, correo, password } = this.miFormulario.value;

    this.authService.register(nombre, correo, password)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/inicio');
          window.location.reload();
        } else {
          Swal.fire('Error', ok, 'error')
        }
      });

  }

}
