import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { PasswordsComponent } from './passwords/passwords.component';
import { HomeComponent } from './home.component';
import { ComponentsModule } from './Components/components.module';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    PasswordsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    ComponentsModule,
    MenubarModule,
    PasswordModule,
    FormsModule,
    DialogModule
  ]
})
export class HomeModule { }
