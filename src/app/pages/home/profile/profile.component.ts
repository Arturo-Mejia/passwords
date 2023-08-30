import { Component, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent {
  @ViewChild('divload', { static: true }) elementoAEsconder!: ElementRef | undefined;
  idu: any ="";
  username: any =""; 
  fechacreacion: any = ""; 
  visibledelete :  boolean = false; 

  constructor(private http: HttpClient, private messageService: MessageService,private router: Router)
  {
    this.idu = localStorage.getItem("iduser"); 
    this.getuser();
  }

  getuser()
  {
    const params = new HttpParams()
    .set('idu', this.idu); 

    this.http.get<any>('https://amhapi.bsite.net/User/getUser',{params}).subscribe({
      next: data => {
          this.username = data.username
          const fechaStr: any =  data.createdadate;
          const fechaObj: Date = new Date(fechaStr);
          this.fechacreacion = fechaObj.getDate()+"-"+(fechaObj.getMonth()+1)+"-"+fechaObj.getFullYear(); 
          this.hideloader(); 
      },
      error: error => {
        console.log(error)
      }
  });
  }

  deleteaccount()
  {
    this.showloader(); 
    const params = new HttpParams()
    .set('idu', this.idu); 

    this.http.delete<any>('https://amhapi.bsite.net/User/delete',{params}).subscribe({
      next: data => {
          this.showSuccess("Cuenta eliminada correctamente");
          this.hideloader(); 
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 1500); 
      },
      error: error => {
        this.showError("Error al eliminar la cuenta "+error)
      }
  });

  }


  showSuccess(msg : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}

showError(msg : string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}  


showloader()
{
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'unset';
  }
}

hideloader()
{
  if (this.elementoAEsconder) {
    this.elementoAEsconder.nativeElement.style.display = 'none';
  }
}

hidemodaldelete()
{
  this.visibledelete = false; 
}

showmodaldelete()
{
  this.visibledelete = true;
}
}
