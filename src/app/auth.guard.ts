import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const role = authService.getRole();
  const requiredRole = route.data['role']; // Récupérer le rôle requis depuis la route

  if (token && role === requiredRole) {
    return true; // L'utilisateur a le bon rôle, il peut accéder
  } else {
    router.navigate(['/notfound']);
    return false; // L'utilisateur n'a pas le bon rôle, redirige vers la page de login
  }
};
