import { Injectable } from '@angular/core';

interface passwordsdata
{
   id:number | undefined;
   iduser: string | undefined;
   descripcion : string | undefined;
   useraccount: string | undefined;
   pass: string | undefined;
}


@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  private cuentas: passwordsdata[]= []; 
  constructor() { }
}
