import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
