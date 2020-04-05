import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RidesModule } from './rides/rides.module';

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
