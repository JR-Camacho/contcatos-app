import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  contactos:any[];

  constructor(private contactosService: ContactosService) {}

  ngOnInit(): void {
    this.optenerContactos();
    this.iniciarFormularioPrincipal();
  }

  iniciarFormularioPrincipal(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      numeros: new FormArray([], [
        Validators.required,
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  iniciarFormularioNumeros(): FormGroup {
    return new FormGroup({
      numero: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  agregarNumero(): void {
    const numero = this.form.get('numeros') as FormArray;
    numero.push(this.iniciarFormularioNumeros());
  }

  getCTRL(key: string, form: FormGroup): any{
    return form.get(key);
  }

  optenerContactos() {
    this.contactos = this.contactosService.optenerContactos();
  }

  guardarContacto() {
    try {
      this.contactosService.guardarContacto(this.form.value);
      this.optenerContactos();
    } catch (error) {
      console.error(error); 
    }
  }

}
