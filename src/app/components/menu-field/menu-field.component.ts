import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: 'app-menu-field',
  templateUrl: './menu-field.component.html',
  styleUrls: ['./menu-field.component.scss']
})
export class MenuFieldComponent {
  role: string | any;
  photo: string | any;
  name: string | any;

  menuSections = [
    {
      section: 'Entity',
      items: [
        { label: 'User', icon: 'fa-users-gear', route: '/user', roles: ['ADMIN'] },
        { label: 'Software', icon: 'fa-solid fa-window-restore', route: '/software', roles: ['ADMIN'] },
        { label: 'License', icon: 'fa-solid fa-id-card', route: '/customer', roles: ['USER'] },
      ]
    },
    {
      section: 'Cancelation',
      items: [
        { label: 'Customer', icon: 'fa-users', route: '/cancel-customer', roles: ['ADMIN'] },
      ]
    },
    {
      section: 'Account Options',
      items: [
        { label: 'Info', icon: 'fa-circle-info', route: '/info', roles: ['ADMIN']},
        { label: 'Info', icon: 'fa-circle-info', route: '/infouser', roles: ['USER']},
        { label: 'Log out', icon: 'fa-right-from-bracket', route: '/login', roles: ['ADMIN','USER'] },
      ]
    }
  ];

  constructor(private authService: AuthService,private router: Router) {
    this.role = this.authService.getRole(); // Récupérer le rôle de l'utilisateur
    const userdetails = this.authService.getUserConnected();
    this.photo = userdetails.photo;
    this.name = userdetails.firstname+" "+userdetails.surname;
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

  editprofil(){
    this.router.navigate(['aboutuser'])
  }
}
