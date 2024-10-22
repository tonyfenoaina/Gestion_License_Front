import { Component } from '@angular/core';
import { GetobjectService } from 'src/app/service/getobject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent{
  size: any = 'large';

  customer:any;

  lists:any;

  datas:any;

  currentPage:number = 0;

  pageSize:number = 5;

  totalPages: number = 1;

  keyword:string = '';
  searchid:string|any;
  namesearchid:string|any;

  constructor(
     private router: Router,
     private getObject:GetobjectService,
  ) {
    const urlget = `public/user/licence/getAllLicenceByCustomer`;
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    this.customer = customer;
  }

  ngOnInit(): void {
    this.getData(this.currentPage, this.pageSize);
  }

  mapDataToFormFields(data: any): void {}

  createDataFromFormFields(): any {}

  async getData(page:any, size:any){
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    const customerId = customer.id;
    console.log(customerId)
    const result = await this.getObject.getObject(`public/user/licence/getAllLicenceByCustomer?idCustomer=${customerId}&page=${page}&size=${size}`);
    this.datas = result.content;
    this.totalPages = result.totalPages;
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getData(this.currentPage, this.pageSize);
    }
  }

  // Méthode pour revenir à la page précédente
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getData(this.currentPage, this.pageSize);
    }
  }

  showLicense(id:any){
    localStorage.setItem('licence',id);
    this.router.navigate(['/aboutlicence']);
  }

  addlicenseForm(){
    this.router.navigate(['/addlicense']);
  }

  async onSearchData(){

  }
}
