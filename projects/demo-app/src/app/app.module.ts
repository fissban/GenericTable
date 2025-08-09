import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppComponent } from './app.component';
import { GenericTableModule } from "projects/generic-table/src/public-api";
import { FormsModule } from '@angular/forms';

registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        GenericTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
