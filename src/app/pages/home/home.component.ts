import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username:string = ""; 
  idu: any ="";
  constructor(private router: Router,  private http: HttpClient)
  { 
    this.idu = localStorage.getItem("iduser"); 
    this.getuser();
  }
  logout()
  {
    localStorage.removeItem("iduser");
    this.router.navigate(["/auth/login"]);
  }

  getuser()
  {
    const params = new HttpParams()
    .set('idu', this.idu); 

    this.http.get<any>('https://amhapi.bsite.net/User/getUser',{params}).subscribe({
      next: data => {
          this.username = data.username.toUpperCase(); 
          console.log(data);
      },
      error: error => {
        console.log(error)
      }
  });
  }

}
