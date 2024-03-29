import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PasswordsComponent } from './passwords/passwords.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
 {
    path:'',
    component:HomeComponent,
    children:
    [
      {
        path:'',
        redirectTo:'passwords',
        pathMatch:'full'
      },
      {
        path:'passwords',
        component:PasswordsComponent,
        pathMatch:'full'
      },
      {
        path:'profile',
        component:ProfileComponent,
        pathMatch:'full'
      }
    ]
    
    
 } 
]

@NgModule({
  declarations: [],
  imports: [
    [CommonModule,[RouterModule.forChild(routes)]]
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
