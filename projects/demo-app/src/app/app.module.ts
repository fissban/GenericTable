import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppComponent } from './app.component';
import { GenericTableModule } from "projects/generic-table/src/public-api";

registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GenericTableModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
