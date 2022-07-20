import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatCardModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatProgressSpinnerModule    
  ]
})
export class MaterialModule { }
