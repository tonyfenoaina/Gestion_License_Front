import { ObjectlistService } from './objectlist.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetobjectService } from './getobject.service';

export abstract class Basecomponent {
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 1;
  isPopupVisible: boolean = false;
  sendButton?: string = 'Add';
  id?: string | any;
  datas: any = [];
  formData?: FormData | any;
  formDataImage?: FormData | any;
  resultData?: any;
  keyword:string = '';
  searchid:string|any;
  namesearchid:string|any;

  constructor(
    protected objectlistService: ObjectlistService,
    protected urlsearch: string,
    protected urlList: string,
    protected urldelete: string,
    protected nzMessageService: NzMessageService,
    protected service: GetobjectService
  ) {}

  createMessage(type: string, error: string): void {
    this.nzMessageService.create(type, error);
  }

  async onSearchData(){
    if(this.keyword==='' || this.keyword === null){
      this.fetchData(this.currentPage, this.pageSize);
      return;
    }
    try {
      let result: any;
      const resultData = await this.objectlistService.getObject(
        this.urlsearch,
        this.currentPage,
        this.pageSize,
        this.keyword,
        this.namesearchid,
        this.searchid,
      );
      result = resultData;
      this.datas = [...result.content];
      this.totalPages = result.totalPages;
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }
  // Méthode pour récupérer les données paginées
  async fetchData(page: number = 0, size: number = 5) {
    try {
      let result: any;
      if (this.keyword && this.keyword !== '') {
        // Perform search
        const resultData = await this.objectlistService.getObject(
          this.urlsearch,
          page,
          size,
          this.keyword,
          this.namesearchid,
          this.searchid,
        );
        result = resultData;
      } else {
        // Fetch main list
        const resultData = await this.objectlistService.getObject(
          this.urlList,
          page,
          size
        );
        result = resultData;
      }
      this.datas = [...result.content];
      this.totalPages = result.totalPages;
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchData(this.currentPage, this.pageSize);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchData(this.currentPage, this.pageSize);
    }
  }


  // Méthode pour basculer la visibilité du popup
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  togglePopupAdd(): void {
    this.sendButton = 'ADD';
    this.isPopupVisible = !this.isPopupVisible;
    this.formData = new FormData();
    this.formDataImage = new FormData();
    this.deleteData();
  }

  // Méthode pour la suppression
  async confirm(id: string): Promise<void> {
    try {
      const result = await this.service.deleteObject(this.urldelete, id);
    } catch (error) {
      console.error('Erreur lors de la suppression des données :', error);
    }
    this.fetchData(this.currentPage, this.pageSize);
    this.nzMessageService.info('Delete confirm');
  }

  // Méthode pour l'action de mise à jour (générique)
  actionUpdate(data: any): void {
    this.id = data.id;
    this.mapDataToFormFields(data);
    this.sendButton = 'Update';
    this.togglePopup();
  }

  isFormDataEmpty(formData: FormData): boolean {
    let isEmpty = true;
    formData.forEach(() => {
      isEmpty = false;
      console.log('nonvide');
    });
    return isEmpty;
  }

  refreshWhenSuccessfulAdd() {
    this.formDataImage = new FormData();
    this.formData = new FormData();
    this.fetchData(this.currentPage, this.pageSize);
    this.togglePopup();
    this.deleteData();
    console.log('karakory');
  }

  async handleSendValues(
    urlupdate: string,
    urladd: string,
    objectService: any
  ) {
    const data = this.createDataFromFormFields();
    let response = null;

    if (data instanceof FormData) {
      // Split FormData into photo and other data
      const photoFormData = new FormData();
      const otherFormData = new FormData();
      let isPhoto = false;
      data.forEach((value, key) => {
        if (key === 'photo') {
          isPhoto = true;
          photoFormData.append(key, value);
        } else {
          otherFormData.append(key, value);
        }
      });

      if (this.id) {
        // Update other data
        console.log("Début de l'upload des autres données");
        await objectService.addwithuploadImage(
          otherFormData,
          urlupdate + '/' + this.id + '/name',
          this.id
        );

        // Update photo if present
        if (isPhoto) {
          console.log("Début de l'upload de la photo");
          await objectService.addwithuploadImage(
            photoFormData,
            urlupdate + '/' + this.id + '/photo',
            this.id
          );
          console.log('Upload de la photo terminé');
        }

        // Refresh data after all updates are complete
        this.refreshWhenSuccessfulAdd();
        return;
      }

      // Handle add action
      await objectService.addwithuploadImage(data, urladd);
      this.refreshWhenSuccessfulAdd();
      return;
    } else {
      if (this.id) {
        data['id'] = this.id;
        response = await objectService.addObject(urlupdate, data);
        this.refreshWhenSuccessfulAdd();
        return;
      } else {
        response = await objectService.addObject(urladd, data);
        this.refreshWhenSuccessfulAdd();
        return;
      }
    }
  }

  // Méthodes abstraites à implémenter dans chaque composant enfant
  abstract mapDataToFormFields(data: any): void; // Mapper les données du serveur vers les champs du formulaire
  abstract createDataFromFormFields(): any; // Créer les données à envoyer au serveur à partir des champs du formulaire
  abstract deleteData(): any;
}
