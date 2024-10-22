import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ObjectlistService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService, private message: NzMessageService) {}

  createErrorDateMessage(type: string, error: string): void {
    this.message.create(type, error);
  }
  // Fonction pour récupérer des objets en utilisant fetch avec pagination
  async getObject(apiName: string, page?: number, size?: number,keyword?: string,namesearchid?:string, searchid?:string): Promise<any> {
    let url = `${this.baseUrl}/${apiName}?page=${page}&size=${size}`;
    if(keyword){
      url = `${this.baseUrl}/${apiName}?page=${page}&size=${size}&keyword=${keyword}`;
      if(namesearchid && searchid){
        url = `${this.baseUrl}/${apiName}?page=${page}&size=${size}&keyword=${keyword}&${namesearchid}=${searchid}`;
      }
    }
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
        this.createErrorDateMessage('error','Please complete all fields')
        console.error('Erreur lors de la requête :', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la requête', error);
      throw new Error('Une erreur est survenue lors de la requête');
    }
  }
}
