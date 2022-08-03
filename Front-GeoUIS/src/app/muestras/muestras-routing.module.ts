import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { MuestraComponent } from './pages/muestra/muestra.component';
import { HomeComponent } from './pages/home/home.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listar', component: ListarComponent },
      { path: 'agregar', component: AgregarComponent },
      {
        path: 'editar/:id', component: AgregarComponent,
        canActivate: [ValidarTokenGuard]
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


