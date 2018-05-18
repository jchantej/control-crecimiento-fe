import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Persona } from './persona.model';
import { PersonaService } from './persona.service';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  personas: Persona[];
  persona: Persona;
  registerForm: FormGroup;
  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) {
    this.persona = { id: 0, nombre: '', apellido: '', fechaNacimiento: new Date(), grupoSanguineo: '', genero: '' };
  }

  ngOnInit() {
    // this.personaService.getListaPersonas().subscribe(p => this.personas = p);
    this.personas = this.personaService.getPersonas();
    this.registerForm = this.formBuilder.group({
      txtNombre: [''],
      txtApellido: [''],
      dtpFechaNacimiento: [''],
      txtGenero: [''],
    });
  }

  /* crear() {
 
     this.personaService.crear(persona);
   }*/

  public onSubmit() {
    this.persona.id = 3;
    /// this.persona = this.registerForm.value; Pronar luego pero haicneod coicidir los valores
    this.persona.nombre = this.registerForm.value.txtNombre;
    this.persona.apellido = this.registerForm.value.txtApellido;
    this.persona.fechaNacimiento = new Date(this.registerForm.value.dtpFechaNacimiento);
    this.persona.grupoSanguineo = 'ORH+';
    this.persona.genero = this.registerForm.value.txtGenero;
    this.personaService.crear(this.persona);

  }

}
