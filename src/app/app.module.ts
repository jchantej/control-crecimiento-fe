import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonaService } from '../app/persona/persona.service';
import { PercentilOmsService } from '../app/percentil-oms/percentil-oms.service';
import { ControlCrecimientoService } from '../app/control-crecimiento/control-crecimiento.service';
import {UsuarioService} from '../app/usuario/usuario.service';
import { PersonaCrudDialogComponent } from '../app/persona/dialogos/persona-crud-dialog.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from '../app/core/http.service';
import { ControlCrecimientoComponent } from './control-crecimiento/control-crecimiento.component';
import { ChartsModule } from 'ng2-charts';
import { PercentilOmsComponent } from './percentil-oms/percentil-oms.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './servicios/auth.service';
import { CabeceraComponent } from './cabecera/cabecera.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaCrudDialogComponent,
    ControlCrecimientoComponent,
    PercentilOmsComponent,
    InicioComponent,
    UsuarioComponent,
    CabeceraComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  entryComponents: [PersonaCrudDialogComponent],
  providers: [HttpService,
    ControlCrecimientoService,
    PersonaService,
    PercentilOmsService,
    UsuarioService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
