import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MuestraComponent } from './pages/muestra/muestra.component';
import { HomeComponent } from './pages/home/home.component';
import { ListarComponent } from './pages/listar/listar.component';
import { MuestrasRoutingModule } from './muestras-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    MuestraComponent,
    HomeComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    MuestrasRoutingModule,
    MaterialModule,
    FlexLayoutModule  
  ]
})
export class MuestrasModule { }
