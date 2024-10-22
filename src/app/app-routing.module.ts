import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/authentification/login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './auth.guard';
import { PagenotfoundComponent } from './components/elements/pagenotfound/pagenotfound.component';
import { SoftwareComponent } from './components/software/software.component';
import { ModuleComponent } from './components/module/module.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerUserComponent } from './components/customer-user/customer-user.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { AddlicenseComponent } from './components/addlicense/addlicense.component';
import { AddPcComponent } from './components/add-pc/add-pc.component';
import { AboutlicenceComponent } from './components/aboutlicence/aboutlicence.component';
import { AboutUserComponent } from './components/about-user/about-user.component';
import { InfoComponent } from './components/info/info.component';
const routes: Routes = [
  // { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent},
  { path: 'notfound', component: PagenotfoundComponent},
  { path: 'user', component: UserComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'software', component: SoftwareComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'module', component: ModuleComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'cancel-customer', component: CustomerComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'customer', component: CustomerUserComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'licenses', component: LicensesComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'addlicense', component: AddlicenseComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'addpc', component: AddPcComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'aboutlicence', component: AboutlicenceComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'info', component: InfoComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'infouser', component: InfoComponent, canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'aboutuser', component: AboutUserComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
