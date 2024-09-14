import { Component } from '@angular/core';
import { PostobjectService } from 'src/app/postobject.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private objectService: PostobjectService,private authService: AuthService, private router: Router) {
    this.authService.logout()
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
        this.router.navigate(['/user']);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  }
}
