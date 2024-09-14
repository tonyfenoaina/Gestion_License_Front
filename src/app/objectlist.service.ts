import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectlistService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService) {}

  // Fonction pour récupérer des objets en utilisant fetch
  async getObject(apiName: string): Promise<any> {
    const url = `${this.baseUrl}/${apiName}`;
    const token = this.authService.getToken();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
          'Content-Type': 'application/json', // Optionnel si nécessaire
        },
        credentials: 'include', // Utilisé si tu envoies des cookies ou des informations d'authentification
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
