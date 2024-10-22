import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { PostauthService } from 'src/app/service/postauth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private objectService: PostauthService,private authService: AuthService, private router: Router,private message: NzMessageService) {
    this.authService.logout()
  }

  createErrorDateMessage(type: string, error: string): void {
    this.message.create(type, error);
  }

  async sendValues() {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      const response = await this.objectService.addObject('api/auth/login', data);
      if (response) {
        console.log('Login successful:', response);
        this.authService.setToken(response);
        if(response.user.role.id===1 && response.user.role.codeRole==='ADMIN'){
          console.log("ETOO")
          this.router.navigate(['/user']);
        }else if(response.user.role.id===2 || response.user.role.codeRole==='USER'){
          console.log("etooA")
          this.router.navigate(['/customer']);
        }
      } else {
        this.createErrorDateMessage('error','Incorrect username or password')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  }
}
