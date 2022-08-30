import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { MuestraComponent } from './pages/muestra/muestra.component';
import { HomeComponent } from './pages/home/home.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { ValidarTokenAdminGuard } from '../auth/guards/validar-token-admin.guard';
import { ValidarTokenUsuarioGuard } from '../auth/guards/validar-token-usuario.guard';
import { ListarPrestamoComponent } from './pages/listar-prestamo/listar-prestamo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listar', component: ListarComponent
      },
      {
        path: 'prestamos', component: ListarPrestamoComponent,
        canActivate: [ValidarTokenUsuarioGuard]
      },
      {
        path: 'prestamo/:id', component: PrestamoComponent,
        canActivate: [ValidarTokenUsuarioGuard]
      },
      {
        path: 'agregar', component: AgregarComponent,
        canActivate: [ValidarTokenAdminGuard]
      },
      {
        path: 'editar/:id', component: AgregarComponent,
        canActivate: [ValidarTokenAdminGuard]
      },
      { path: ':id', component: MuestraComponent },
      { path: '**', redirectTo: 'listar' },
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MuestrasRoutingModule { }


