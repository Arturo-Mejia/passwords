import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    LoginComponent,AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule,
    PasswordModule,
    DialogModule
  ], exports:
  [
    DialogModule
  ]
})
export class AuthModule { }
