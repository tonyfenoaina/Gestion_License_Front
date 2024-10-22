import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class GetobjectService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService,
    private message: NzMessageService) {}

    createErrorDateMessage(type: string, error: string): void {
      this.message.create(type, error);
    }

  // Fonction pour récupérer des objets en utilisant fetch
  async getObject(apiName: string): Promise<any> {
    const url = `${this.baseUrl}/${apiName}`;
    const token = this.authService.getToken();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Réponse du serveur :', result);
        return result;
      } else {
        this.createErrorDateMessage('error','Please complete all fields')
        console.error('Erreur lors de la requête :', response.statusText);
        return null;
      }
    } catch (error) {
      window.location.reload();
      throw new Error('Une erreur est survenue lors de la requête');
    }
  }

  // Fonction pour supprimer un objet en utilisant fetch (DELETE)
async deleteObject(apiName: string, id: string): Promise<any> {
  const url = `${this.baseUrl}/${apiName}/${id}`;
  const token = this.authService.getToken();

  try {
    const response = await fetch(url, {
      method: 'DELETE',
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
