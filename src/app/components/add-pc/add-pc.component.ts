import { GetobjectService } from 'src/app/service/getobject.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostobjectService } from 'src/app/service/postobject.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.scss'],
})
export class AddPcComponent implements OnInit {
  numberOfPCs: number = parseInt(
    localStorage.getItem('numberActivation') || '0',
    10
  );
  pcList: string[] | any = [];

  constructor(
    private router: Router,
    private getobjectService: GetobjectService,
    private postobjectService: PostobjectService
  ) {}

  ngOnInit(): void {
    if (this.numberOfPCs === 0 || this.numberOfPCs === null) {
      this.router.navigate(['/licences']);
    }

    // Appeler l'API pour récupérer la liste des PC
    this.fetchPcList();
  }

  // Appel de l'API pour récupérer la liste des PC
  async fetchPcList() {
    this.pcList = await this.getobjectService.getObject(
      `public/user/licence/getIdPc?idLicence=${localStorage.getItem('licence')}`
    );
    console.log(this.pcList);
  }

  // Soumission du formulaire
  async submit() {
    const data = {
      idLicence: localStorage.getItem('licence'),
      listIdPc: this.pcList,
    };
    try {
      await this.postobjectService.addObject(`public/user/licence/addPc`, data);
      localStorage.removeItem('numberActivation');
      localStorage.removeItem('licence');
      this.router.navigate(['/licenses']);
    } catch {
      console.log('Error create pc');
    }
  }

  // Annulation
  backCustomer() {
    localStorage.removeItem('numberActivation');
    localStorage.removeItem('licence');
    this.router.navigate(['/licenses']);
  }
}
