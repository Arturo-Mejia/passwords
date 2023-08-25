import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { PasswordsComponent } from './passwords/passwords.component';
import { HomeComponent } from './home.component';
import { ComponentsModule } from './Components/components.module';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    HomeComponent,
    PasswordsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    ComponentsModule,
    MenubarModule
  ]
})
export class HomeModule { }
