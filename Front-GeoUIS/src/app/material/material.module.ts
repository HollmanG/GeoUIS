import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  exports: [
    MatCardModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
