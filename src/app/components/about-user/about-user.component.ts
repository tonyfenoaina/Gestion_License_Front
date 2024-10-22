import { Component } from '@angular/core';
import { PostobjectService } from 'src/app/service/postobject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent {
  photo?: File | any;
  firstname?: string | any;
  email?: string | any;
  contact?: string | any;
  surname?: string | any;
  password?: string | any;
  confirmPassword?: string | any;
  errorPassword?: string = '';

  selectedFileName: string = '';
  fileName: string = 'Aucun fichier sélectionné';
  isPopupVisible: boolean = false;
  isFileSelected: boolean = false;

  constructor(private postobject: PostobjectService, private router: Router) {}

  ngOnInit() {
    const user: any = JSON.parse(localStorage.getItem('userconnected') || '{}');
    console.log('ici');
    console.log(user);
    this.photo = user.photo;
    this.firstname = user.firstname;
    this.email = user.email;
    this.contact = user.contact;
    this.surname = user.surname;
    this.password = user.password;
    this.confirmPassword = user.password;
  }
  getJsonData(formData1: FormData, formData2: FormData,role:any): FormData {
    const combinedFormData = new FormData();

    // Ajouter les paires clé/valeur de formData1
    formData1.forEach((value, key) => {
      combinedFormData.append(key, value);
    });

    formData2.delete('id');

    // Ajouter les paires clé/valeur de formData2
    formData2.forEach((value, key) => {
      combinedFormData.append(key, value);
    });

    const jsonObject: any = {};

    // Parcourir les paires clé/valeur du FormData et les ajouter à jsonObject
    combinedFormData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const combinJson = {...jsonObject,role}

    return combinJson;
  }

  async updateUser() {
    const user: any = JSON.parse(localStorage.getItem('userconnected') || '{}');
    const id = user.id;
    console.log(user);
    if (!this.password === this.confirmPassword) {
      this.errorPassword = 'Password is not the same';
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('firstname', this.firstname);
    formData.append('email', this.email);
    formData.append('contact', this.contact);
    formData.append('surname', this.surname);
    formData.append('password', this.password);
    await this.postobject.addwithuploadImage(
      formData,
      `secure/${user.role.codeRole === 'ADMIN' ? 'admin/users' : 'user'}/update/data`,
      id
    );

    const formDataImage = new FormData();
    formDataImage.append('id', id);
    formDataImage.append('photo', this.photo);
    if (this.isFileSelected===true) {
      await this.postobject.addwithuploadImage(
        formDataImage,
        `secure/${
          user.role.codeRole === 'ADMIN' ? 'admin/users' : 'user'
        }/update/photo`,
        id
      );
    }
    const combinFormData:any = this.getJsonData(formData, formDataImage,user.role);
    console.log(combinFormData)
    localStorage.setItem('userconnected',JSON.stringify(combinFormData));
    this.isPopupVisible = true;
  }

  togglePopup(){
    this.isPopupVisible = !this.isPopupVisible;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.photo = file;
    }
    this.isFileSelected=true;
  }

  logout(){
    this.router.navigate(["/login"])
  }
}
