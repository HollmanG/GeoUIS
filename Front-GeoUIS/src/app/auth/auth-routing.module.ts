import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { ValidarUsuarioLoginGuard } from './guards/validar-usuario-login.guard';

const routes: Routes = [
  {
    path: '',
    component: MainAuthComponent,
    children: [
      {path: 'login', component: LoginComponent, canActivate: [ValidarUsuarioLoginGuard] },
      {path: 'register', component: RegisterComponent , canActivate: [ValidarUsuarioLoginGuard]},
      {path: '**', redirectTo: 'login'},
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
