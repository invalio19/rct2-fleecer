import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RideComponent } from './ride/ride.component';
import { RideListComponent } from './ride-list/ride-list.component';

@NgModule({
  declarations: [
    RideComponent,
    RideListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RideListComponent
  ]
})
export class RidesModule { }
