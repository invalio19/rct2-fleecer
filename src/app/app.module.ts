import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RidesModule } from './rides/rides.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RidesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
