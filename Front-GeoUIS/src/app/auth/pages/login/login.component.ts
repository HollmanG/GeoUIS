import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
      // console.log(resp);
      if(ok) {
        this.router.navigateByUrl('/inicio'); 
      } else {
        // mensaje de error
      }
    })
    
  }

}
