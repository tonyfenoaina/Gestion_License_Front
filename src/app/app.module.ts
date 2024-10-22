import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/authentification/login-page/login-page.component';
import { InputFieldComponent } from './components/elements/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { MenuFieldComponent } from './components/menu-field/menu-field.component';
import { UserComponent } from './components/user/user.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PostobjectService } from './service/postobject.service';
import { PagenotfoundComponent } from './components/elements/pagenotfound/pagenotfound.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CustomerComponent } from './components/customer/customer.component';
import { SoftwareComponent } from './components/software/software.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ModuleComponent } from './components/module/module.component';
import { CustomerUserComponent } from './components/customer-user/customer-user.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { AddlicenseComponent } from './components/addlicense/addlicense.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { AddPcComponent } from './components/add-pc/add-pc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutlicenceComponent } from './components/aboutlicence/aboutlicence.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AboutUserComponent } from './components/about-user/about-user.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { InfoComponent } from './components/info/info.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputFieldComponent,
    MenuFieldComponent,
    UserComponent,
    PagenotfoundComponent,
    CustomerComponent,
    SoftwareComponent,
    ModuleComponent,
    CustomerUserComponent,
    LicensesComponent,
    AddlicenseComponent,
    AddPcComponent,
    AboutlicenceComponent,
    AboutUserComponent,
    HeaderTopComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzUploadModule,
    HttpClientModule,
    NzDropDownModule,
    NzMenuModule,
    NzCheckboxModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzSpinModule,
    NzMessageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    PostobjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
