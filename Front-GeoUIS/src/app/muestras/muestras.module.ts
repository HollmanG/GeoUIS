import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { MuestraComponent } from './pages/muestra/muestra.component';
import { HomeComponent } from './pages/home/home.component';
import { ListarComponent } from './pages/listar/listar.component';
import { MuestrasRoutingModule } from './muestras-routing.module';
import { MaterialModule } from '../material/material.module';
import { MuestraTarjetaComponentComponent } from './components/muestra-tarjeta-component/muestra-tarjeta-component.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    MuestraComponent,
    HomeComponent,
    ListarComponent,
    MuestraTarjetaComponentComponent,
    ImagenPipe,
    BuscadorComponent,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    MuestrasRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    BuscadorComponent
  ]
})
export class MuestrasModule { }
