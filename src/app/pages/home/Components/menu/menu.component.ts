import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   itemselected: number = 1; 
    constructor(private router: Router)
    {
    }
  ngOnInit() {
   const currentUrl: string = window.location.href;
   if(currentUrl.includes("profile"))
   {
      this.itemselected = 2; 
   }
   if(currentUrl.includes("passwords"))
   {
      this.itemselected = 1; 
   }
  }

 iraprofile()
 {
    this.router.navigate(["/home/profile"]);
    this.itemselected = 2; 
 }

 irapasswords()
 {
    this.router.navigate(["/home/passwords"]);
    this.itemselected = 1; 
 }
}
