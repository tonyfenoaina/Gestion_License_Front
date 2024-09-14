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
import { PostobjectService } from './postobject.service';
import { PagenotfoundComponent } from './components/elements/pagenotfound/pagenotfound.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputFieldComponent,
    MenuFieldComponent,
    UserComponent,
    PagenotfoundComponent,
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
    HttpClientModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    PostobjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
