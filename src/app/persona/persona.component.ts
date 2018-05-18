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
    this.createForm();
    this.persona = { id: 0, nombre: '', apellido: '', fechaNacimiento: new Date(), grupoSanguineo: '', genero: '' };
  }

  ngOnInit() {

    // this.personaService.getListaPersonas().subscribe(p => this.personas = p);
    this.personas = this.personaService.getPersonas();

  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      genero: '',
      grupoSanguineo: '',
      foto: ''
    });
  }

 private prepareCreate(): Persona {
    const formModel = this.registerForm.value;
    const personaMap: Persona = {
      nombre: formModel.nombre,
      apellido: formModel.apellido,
      fechaNacimiento: new Date(formModel.fechaNacimiento),
      grupoSanguineo: formModel.grupoSanguineo,
      foto: formModel.foto
    };
    return personaMap;
  }
  /* crear() {
 
     this.personaService.crear(persona);
   }*/

  public onSubmit() {
    //this.persona.id = 3;
    this.personaService.crear(this.prepareCreate());

  }

}
