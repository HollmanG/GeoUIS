import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'inicio', component: MainComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'muestra', loadChildren: () => import('./muestras/muestras.module').then(m => m.MuestrasModule)
  },
  { path: 'mapa', loadChildren: () => import('./mapa/mapa.module').then(m => m.MapaModule) },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
