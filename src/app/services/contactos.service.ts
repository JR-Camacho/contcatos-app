import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor() { }

  contactos:any[];

  optenerContactos(){
    let datos = sessionStorage.getItem('contactos');
    console.log(datos);
    if(datos) this.contactos.push(datos);
    return this.contactos; 
  }

  guardarContacto(contacto:any){
    this.optenerContactos();
    this.contactos.push(contacto);
    sessionStorage.setItem('contactos', JSON.stringify(this.contactos));
  }

}
