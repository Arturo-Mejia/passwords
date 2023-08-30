import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '', 
  redirectTo:'auth',
  pathMatch: 'full'
},
{
  path:'auth',
   loadChildren: ()=>
   import("./pages/auth/auth.module").then((m)=>m.AuthModule)
  },
  {
    path:'home',
    loadChildren: ()=> import("./pages/home/home.module").then((m)=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
