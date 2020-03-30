import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RideComponent } from './ride/ride.component';

@NgModule({
  declarations: [
    RideComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RideComponent
  ]
})
export class RidesModule { }
