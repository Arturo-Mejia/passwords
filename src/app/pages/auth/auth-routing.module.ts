import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = 
[
  {
    path:'',
    component:AuthComponent,
    children: [{
      path:'',
      redirectTo:'login',
      pathMatch:'full'
    },
    {
     path:'login',
     component: LoginComponent
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
export class AuthRoutingModule { }
