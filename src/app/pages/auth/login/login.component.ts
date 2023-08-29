import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {

  @ViewChild('divload', { static: true }) elementoAEsconder!: ElementRef | undefined;
  
  email: string = "";
  pass: string = ""; 
  visible: boolean = false;
  regemail: string = ""; 
  regusername: string = "";
  regpass: string = ""; 

  constructor( private http: HttpClient,private router: Router, private messageService: MessageService) {
    setTimeout(() => {
      this.ocultarElemento();
      if(localStorage.getItem("iduser") != null)
      {
        this.router.navigate(["/home"]);
      }
    }, 1500);
}

ocultarElemento() {
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'none';
  }
}

mostrarelemento()
{
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'block';
  }
}

ngOnInit() {
}


login() {

  this.mostrarelemento();
  const url = 'https://amhapi.bsite.net/User/login';

  const params = new HttpParams()
      .set('email', this.email)
      .set('pass', this.pass);

  this.http.post<any>(url,null,{params}).subscribe(
    data => {
      console.log('Response:', data);
      this.ocultarElemento(); 
      localStorage.setItem("iduser",data.iduser);
      this.router.navigate(["/home"]);
    },
    error => {
      console.error('Error:', error);
      this.showError(error.error.message); 
      this.ocultarElemento();
    }
  );
}

register()
{ 
  if(this.regemail == "" || this.regpass =="" || this.regusername =="")
  {
    this.showError("Ingrese todos los datos para poder continuar"); 
    return;
  }
  
  if(!this.validaremail(this.regemail))
  {
    this.showError("El correo ingresado no es válido"); 
    return; 
  }

  if(this.regpass.length<8)
  {
    this.showError("La contraseña debe tener mínimo 8 caracteres"); 
    return; 
  }
  this.mostrarelemento();
  let datareg = 
  {
    email: this.regemail,
    username: this.regusername,
    password: this.regpass
  }   
  this.http.post<any>('https://amhapi.bsite.net/User/create', datareg).subscribe({
    next: data => {
      this.visible = false;
        this.showSuccess("Registrado correctamente");
        this.ocultarElemento();
        this.regemail = ""; 
        this.regpass = ""; 
        this.regusername = "";  
    },
    error: error => { 
        this.showError("Error al registrar: "+error.error.message);
        this.ocultarElemento(); 
    }
})
}

showError(msg: string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}

showSuccess(msg: string) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}

showDialog() {
  this.visible = true;
}


 validaremail(email:string) : boolean
{
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(emailPattern.test(email))
  {
    return true
  } else{ return false}
}

}
