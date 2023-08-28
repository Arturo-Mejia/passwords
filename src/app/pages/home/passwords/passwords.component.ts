import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface passwordsdata
{
   id:number | undefined;
   iduser: string | undefined;
   descripcion : string | undefined;
   useraccount: string | undefined;
   pass: string | undefined;
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

  constructor(private http: HttpClient, private messageService: MessageService)
  {
  }
  ngOnInit() {

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
          console.error('There was an error!', error); 
          if (this.elementoAEsconder) {
            this.elementoAEsconder.nativeElement.style.display = 'none';
          }
      }
  });

  }
   
  updateItem(index: number) {
    
  }


  showmodalcreate()
  {
    this.visiblecreate = true;
  }

  showmodaledit(item: passwordsdata)
  {
    this.visibleedit = true; 
    console.log(item);
  }

  showmodaldelete(item: passwordsdata)
  {
    this.visibledelete = true; 
    console.log(item);
  }

  hidemodaldelete()
  {
    this.visibledelete = false; 
  }
  
}


