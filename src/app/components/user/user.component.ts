import { Component } from '@angular/core';
import { ObjectlistService } from 'src/app/objectlist.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private objectlistService: ObjectlistService) {}
  size: any = 'large';

  isPopupVisible: boolean = false;

  // Méthode pour basculer la visibilité du popup
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  //form
  firstname?: string;
  lastname?:string;
  surname?:string;
  password?:string;
  confirmPassword?:string;

  users : any[] = [];

  async fetchData() {
    try {
      const result = await this.objectlistService.getObject('secure/admin/users/getUser');
      console.log('Données récupérées :', result);
      this.users = result;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
