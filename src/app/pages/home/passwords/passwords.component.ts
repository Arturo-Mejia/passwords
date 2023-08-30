import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { Router } from '@angular/router';

interface passwordsdata
{
   id:number;
   iduser: string;
   descripcion : string;
   useraccount: string;
   pass: string ;
}

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css'],
  providers:[MessageService]
})
export class PasswordsComponent {
  @ViewChild('divload', { static: true }) elementoAEsconder!: ElementRef | undefined;
  items: passwordsdata[] = [];
  idu:any =""; 
  curentitem: passwordsdata | undefined; 
  visiblecreate: boolean = false;
  visibleedit: boolean = false;
  visibledelete: boolean = false;

  regiduser: string | undefined = localStorage.getItem("iduser")?.toString(); 
  regdescripcion: string =""; 
  reguseraccount: string ="";
  regpass: string =""; 

  // datos para editar cuenta 
  upddescripcion: string =""; 
  upduseraccount: string ="";
  updpass: string =""; 

  constructor(private http: HttpClient, private messageService: MessageService, private router:Router)
  {
  
  }
  ngOnInit() {

    this.updatelist(); 

  }
   
  updateItem(index: number) {
    
  }


  showmodalcreate()
  {
    this.visiblecreate = true;
  }

  showmodaledit(item: passwordsdata)
  {
    this.curentitem = item; 
    this.visibleedit = true; 
    this.upddescripcion = item.descripcion; 
    this.upduseraccount = item.useraccount;
    this.updpass = item.pass; 

  }

  showmodaldelete(item: passwordsdata)
  {
    this.visibledelete = true; 
    this.curentitem = item; 
  }

  hidemodaldelete()
  {
    this.visibledelete = false; 
  }
  
  copypass(item: passwordsdata)
  {
    try {
      navigator.clipboard.writeText(item.pass);
      this.showSuccess("contraseña copiada correctamente"); 
    } catch (err) {
      console.error("Error al copiar al portapapeles: ", err);
      this.showError("Error al copiar al portapapeles: ");
    }
  }

  showSuccess(msg : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}

showError(msg : string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}

updateaccount()
{  

  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'unset';
  }

  this.curentitem!.descripcion = this.upddescripcion; 
  this.curentitem!.useraccount = this.upduseraccount; 
  this.curentitem!.pass = this.updpass; 
  let data = this.curentitem; 
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.http.put<any>('https://amhapi.bsite.net/Accounts/UpdateAccount',data,{headers}).subscribe({
    next: data => {
        console.log(data);
        this.showSuccess("Datos actualizados correctamente");
        this.visibleedit= false; 
        if (this.elementoAEsconder) {
          this.elementoAEsconder.nativeElement.style.display = 'none';
        }
    },
    error: error => {
        if (this.elementoAEsconder) {
          this.elementoAEsconder.nativeElement.style.display = 'none';
        }
    }
});
}

deleteaccount()
{
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'unset';
  }
  this.idu = localStorage.getItem("iduser"); 
  const params = new HttpParams()
  .set('idu', this.idu).set("idaccount",this.curentitem!.id);

  this.http.delete<any>('https://amhapi.bsite.net/Accounts/delete',{params}).subscribe({
    next: data => { 
        if (this.elementoAEsconder) {
          this.elementoAEsconder.nativeElement.style.display = 'none';
        }
        this.visibledelete = false; 
        this.updatelist(); 
        this.showSuccess("Eliminado correctamente");
    },
    error: error => {
        console.error('There was an error!', error); 
        if (this.elementoAEsconder) {
          this.elementoAEsconder.nativeElement.style.display = 'none';
        }
        this.showError("Error al eliminar la cuenta : "+error);
    }
});
}

updatelist()
{
  this.idu = localStorage.getItem("iduser"); 
    
    const params = new HttpParams()
    .set('idu', this.idu);

    this.http.get<passwordsdata[]>('https://amhapi.bsite.net/Accounts/getAccounts',{params}).subscribe({
      next: data => {
          this.items = data; 
          if (this.elementoAEsconder) {
            this.elementoAEsconder.nativeElement.style.display = 'none';
          }
      },
      error: error => {
          if (this.elementoAEsconder) {
            this.elementoAEsconder.nativeElement.style.display = 'none';
          }
          this.items = []; 
      }
  });
}

createaccount()
{
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'unset';
  }
  let data = 
  {
  iduser: localStorage.getItem("iduser"),
  descripcion: this.regdescripcion,
  useraccount: this.reguseraccount,
  pass: this.regpass
  }

  this.http.post<any>('https://amhapi.bsite.net/Accounts/create',data).subscribe({
    next: data =>{
      this.visiblecreate = false; 
      this.regdescripcion = ""; 
      this.reguseraccount = ""; 
      this.regpass = ""; 
      this.showSuccess("Regitrado correctamente"); 
      this.updatelist(); 
      if (this.elementoAEsconder) {
        this.elementoAEsconder.nativeElement.style.display = 'none';
      }
    },
    error: error =>
    {
      this.showError("Error al registrar: "+error)
      if (this.elementoAEsconder) {
        this.elementoAEsconder.nativeElement.style.display = 'none';
      }
    }
  });
}

}


