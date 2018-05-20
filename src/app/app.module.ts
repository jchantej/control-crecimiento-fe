import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonaService } from '../app/persona/persona.service';
import {PersonaCrudDialogComponent} from '../app/persona/dialogos/persona-crud-dialog.component';
import { HttpModule, JsonpModule } from '@angular/http';
import {HttpService} from '../app/core/http.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaCrudDialogComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  entryComponents: [PersonaCrudDialogComponent],
  providers: [HttpService, PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
