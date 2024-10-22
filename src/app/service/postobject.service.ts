import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class PostobjectService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService, private http: HttpClient,private message: NzMessageService) {}

  createErrorDateMessage(type: string, error: string): void {
    this.message.create(type, error);
  }

  async addObject(
    apiName: string,
    data?: any,
    id?: string,
    formData?: FormData,
    formDataUpdate?: FormData
  ): Promise<any> {
    const url = `${this.baseUrl}/${id ? id + '/' : ''}${apiName}`;
    const token = this.authService.getToken();
    try {
      const response = await fetch(url, {
        method: id || data.id ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Utilisé si tu envoies des cookies ou des informations d'authentification
        body: JSON.stringify(data), // Envoyer le FormData comme corps de la requête
      });

      if (response.ok) {
        const result = await response.json();
        this.createErrorDateMessage('success', 'Action successfully');
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

  async addwithuploadImage(formData: FormData, url: string, id?: string): Promise<any> {
    console.log(id);
    const token = this.authService.getToken();
    console.log('fin', formData);
    try {
      const response = await fetch(`${this.baseUrl}/${url}`, {
        method: id ? 'PUT' : 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        this.createErrorDateMessage('error', 'Please complete all fields');
        throw new Error('Upload failed');
      }

      const result = await response.json();
      this.createErrorDateMessage('success', 'Action successfully');
      console.log('Upload successful!', result);
      return result;
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }

}
