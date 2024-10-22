import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { PostobjectService } from 'src/app/service/postobject.service';

@Component({
  selector: 'app-addlicense',
  templateUrl: './addlicense.component.html',
  styleUrls: ['./addlicense.component.scss'],
})
export class AddlicenseComponent {
  size: any = 'large';
  startdate?: string | '';
  enddate?: string | '';
  activationNumber?: string | any;
  idLicence: string | any;

  // Software properties
  softwares: any[] = [];
  totalPagesSoftwares: number = 1;
  selectedSoftware: any;
  currentPageSoftware: number = 0;
  pageSizeSoftware: number = 3;
  softwareKeyword: string = '';

  // Module properties
  modules: any[] = [];
  totalPagesModules: number = 1;
  currentPageModule: number = 0;
  pageSizeModule: number = 3;
  moduleKeyword: string = '';

  allChecked: boolean = false;
  // Keep track of selected modules
  checkedMap: { [key: number]: boolean } = {};
  selectedModuleIds: number[] = [];

  constructor(
    private objectlistService: ObjectlistService,
    private router: Router,
    private postobject: PostobjectService
  ) {}

  ngOnInit(): void {
    this.fetchData(this.currentPageSoftware, this.pageSizeSoftware);
  }

  backCustomer() {
    this.router.navigate(['/licenses']);
  }

  async fetchData(page: number = 0, size: number = 3) {
    try {
      let result: any;
      if (this.softwareKeyword && this.softwareKeyword.trim() !== '') {
        // Perform search
        result = await this.objectlistService.getObject(
          'secure/user/software/search',
          page,
          size,
          this.softwareKeyword
        );
      } else {
        // Fetch main list
        result = await this.objectlistService.getObject(
          'secure/user/software/getAll',
          page,
          size
        );
      }
      console.log('Données récupérées :', result);
      this.softwares = result.content;
      this.totalPagesSoftwares = result.totalPages;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  async fetchDataModules(page: number = 0, size: number = 3) {
    try {
      let result: any;
      if (this.moduleKeyword && this.moduleKeyword.trim() !== '') {
        // Perform search
        result = await this.objectlistService.getObject(
          `secure/user/module/search`,
          page,
          size,
          this.moduleKeyword,
          'software',
          this.selectedSoftware.id
        );
      } else {
        // Fetch main list
        result = await this.objectlistService.getObject(
          `secure/user/module/getAll/${this.selectedSoftware.id}`,
          page,
          size
        );
      }
      console.log('Données récupérées :', result);
      this.modules = result.content;
      this.totalPagesModules = result.totalPages;

      // Initialize checkedMap for modules
      this.modules.forEach((module) => {
        if (!this.checkedMap.hasOwnProperty(module.id)) {
          this.checkedMap[module.id] = false; // Module not selected by default
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  // Handle search for software
  onSearchSoftware() {
    this.currentPageSoftware = 0; // Reset to first page on new search
    this.fetchData(this.currentPageSoftware, this.pageSizeSoftware);
  }

  // Handle search for modules
  onSearchModule() {
    this.currentPageModule = 0; // Reset to first page on new search
    this.fetchDataModules(this.currentPageModule, this.pageSizeModule);
  }

  // Pagination methods for software
  nextPageSoftware() {
    if (this.currentPageSoftware < this.totalPagesSoftwares - 1) {
      this.currentPageSoftware++;
      this.fetchData(this.currentPageSoftware, this.pageSizeSoftware);
    }
  }

  prevPageSoftware() {
    if (this.currentPageSoftware > 0) {
      this.currentPageSoftware--;
      this.fetchData(this.currentPageSoftware, this.pageSizeSoftware);
    }
  }

  // Pagination methods for modules
  nextPageModule() {
    if (this.currentPageModule < this.totalPagesModules - 1) {
      this.currentPageModule++;
      this.fetchDataModules(this.currentPageModule, this.pageSizeModule);
    }
  }

  prevPageModule() {
    if (this.currentPageModule > 0) {
      this.currentPageModule--;
      this.fetchDataModules(this.currentPageModule, this.pageSizeModule);
    }
  }

  // Handle selection of each module
  onItemChecked(id: number, checked: boolean): void {
    this.checkedMap[id] = checked;
    this.updateSelectedModules();
  }

  // Handle selection of all modules on current page
  onAllChecked(checked: boolean): void {
    this.allChecked = checked;
    this.modules.forEach((module) => {
      this.checkedMap[module.id] = checked;
    });
    this.updateSelectedModules();
  }

  // Update list of selected modules
  updateSelectedModules(): void {
    this.selectedModuleIds = Object.keys(this.checkedMap)
      .filter((id) => this.checkedMap[+id])
      .map((id) => +id);
    console.log('Modules sélectionnés:', this.selectedModuleIds);
  }

  async selectSoftware(software: any) {
    this.selectedSoftware = software;
    this.moduleKeyword = '';
    this.currentPageModule = 0;
    this.fetchDataModules(this.currentPageModule, this.pageSizeModule);
  }

  addModules() {
    console.log('IDs des modules sélectionnés :', this.selectedModuleIds);
  }

  showSoftwares() {
    this.selectedSoftware = null;
    this.softwareKeyword = '';
    this.currentPageSoftware = 0;
    this.fetchData(this.currentPageSoftware, this.pageSizeSoftware);
  }

  async addLicense() {
    // Add license
    const customer: any = localStorage.getItem('customer')
      ? JSON.parse(localStorage.getItem('customer')!)
      : null;
    console.log(customer);
    const data = {
      idCustomer: customer.id,
      idSoftware: this.selectedSoftware.id,
      dateStart: this.startdate,
      dateEnd: this.enddate,
      numberActivation: this.activationNumber,
    };
    const license: any = await this.postobject.addObject(
      'public/user/licence/addLicence',
      data
    );
    if (license) {
      console.log('ok ', license);
      const dataModule = {
        idLicence: license.id,
        listIdModule: this.selectedModuleIds,
      };
      const addmodule: any = await this.postobject.addObject(
        'public/user/licence/addModule',
        dataModule
      );
      localStorage.setItem('licence', license.id);
      localStorage.setItem('numberActivation', this.activationNumber);
      this.router.navigate(['/addpc']);
    }
  }
}
