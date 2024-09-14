import { Component } from '@angular/core';
import { AuthService } from "src/app/auth.service";

@Component({
  selector: 'app-menu-field',
  templateUrl: './menu-field.component.html',
  styleUrls: ['./menu-field.component.scss']
})
export class MenuFieldComponent {
  role: string | any;

  menuSections = [
    {
      section: 'Entity',
      items: [
        { label: 'User', icon: 'fa-users-gear', route: '/user', roles: ['ADMIN'] },
        { label: 'Customer', icon: 'fa-layer-group', route: '/signin', roles: ['ADMIN'] },
      ]
    },
    {
      section: 'Cancelation',
      items: [
        { label: 'Customer', icon: 'fa-users', route: '/cancel-customer', roles: ['ADMIN'] },
        { label: 'License', icon: 'fa-id-card', route: '/license', roles: ['ADMIN'] },
      ]
    },
    {
      section: 'Account Options',
      items: [
        { label: 'Info', icon: 'fa-circle-info', route: '/info', roles: ['ADMIN'] },
        { label: 'Log out', icon: 'fa-right-from-bracket', route: '/logout', roles: ['ADMIN'] },
      ]
    }
  ];

  constructor(private authService: AuthService) {
    this.role = this.authService.getRole(); // Récupérer le rôle de l'utilisateur
  }

  // Filtrer les sections pour ne garder que celles avec au moins une option visible pour le rôle actuel
  getFilteredSections() {
    return this.menuSections
      .map(section => {
        // Filtrer les options en fonction du rôle de l'utilisateur
        const filteredItems = section.items.filter(item => item.roles.includes(this.role));
        return {
          ...section,
          items: filteredItems
        };
      })
      // Ne garder que les sections qui contiennent au moins une option
      .filter(section => section.items.length > 0);
  }
}
