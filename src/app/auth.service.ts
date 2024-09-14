import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserConnected(): any {
    return localStorage.getItem('userconnected');
  }

  setToken(userconnected:any): void {
     localStorage.setItem('token',userconnected.token);
     localStorage.setItem('role',userconnected.user.role.codeRole)
     localStorage.setItem('userconnected',userconnected.user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userconnected');
  }
}
