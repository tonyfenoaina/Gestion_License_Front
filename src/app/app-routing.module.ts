import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/authentification/login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './auth.guard';
import { PagenotfoundComponent } from './components/elements/pagenotfound/pagenotfound.component';
const routes: Routes = [
  // { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent},
  { path: 'notfound', component: PagenotfoundComponent},
  { path: 'user', component: UserComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
