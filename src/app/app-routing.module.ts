import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../app/inicio/inicio.component';
import { ControlCrecimientoComponent } from '../app/control-crecimiento/control-crecimiento.component';
import { PersonaComponent } from '../app/persona/persona.component';
import { UsuarioComponent } from '../app/usuario/usuario.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'control', component: ControlCrecimientoComponent
  },
  {
    path: 'persona', component: PersonaComponent
  },
  {
    path: 'perfil', component: UsuarioComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}