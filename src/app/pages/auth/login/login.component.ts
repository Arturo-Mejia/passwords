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

showError(msg: string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}


}
