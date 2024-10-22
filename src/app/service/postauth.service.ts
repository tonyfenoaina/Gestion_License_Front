import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostauthService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService) {}

  // Fonction pour ajouter un objet en utilisant fetch
  async addObject(apiName: string, data: any): Promise<any> {
    const url = `${this.baseUrl}/${apiName}`;
    console.log(data);
    try {
      const response = await fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Réponse du serveur :', result);
        return result;
      } else {
        console.error('Erreur lors de la requête :', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la requête', error);
      throw new Error('Une erreur est survenue lors de la requête');
    }
  }
}
