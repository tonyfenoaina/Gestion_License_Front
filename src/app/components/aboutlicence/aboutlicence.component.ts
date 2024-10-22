import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetobjectService } from 'src/app/service/getobject.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-aboutlicence',
  templateUrl: './aboutlicence.component.html',
  styleUrls: ['./aboutlicence.component.scss']
})
export class AboutlicenceComponent {
  licence: any=null;
  licenceIdentityActive:any;
  licenceIdentityNonActive:any;
  isPopupVisible:boolean=false;
  constructor(
    private router: Router,
    private getObject: GetobjectService,
    private message: NzMessageService
  ) {
  }

  createErrorDateMessage(type: string, error: string): void {
    this.message.create(type, error);
  }

  async activationIdentity(data:any){
    const idlicence = localStorage.getItem("licence");
    console.log(data)
    const endDate = new Date(data.licence.endDate);
    const currentDate = new Date();
    console.log(endDate < currentDate)
    if (endDate < currentDate) {
      this.createErrorDateMessage('error','Expired Date')
      return;
    }
    try{
      const result = await this.getObject.getObject(`public/user/licence/activeLicence_manuel?idPc=${data.idPc}&idLicence=${data.idLicence}`);
      window.location.reload()
    }catch{
      this.createErrorDateMessage('error','')
      return;
    }
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
    console.log("eti")
  }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(){
    const idlicence = localStorage.getItem("licence");
    this.licence= await this.getObject.getObject(`public/user/licence/get/${idlicence}`);
    this.licenceIdentityActive = await this.getObject.getObject(`public/user/licence/getLicenceIdentityActive?idLicence=${idlicence}`);
    console.log(this.licenceIdentityActive)
    this.licenceIdentityNonActive = await this.getObject.getObject(`public/user/licence/getLicenceIdentityNonActive?idLicence=${idlicence}`);
    console.log(this.licenceIdentityNonActive);
  }

  async downloadLicense(){
    const idlicence = localStorage.getItem("licence");
    await this.getObject.getObject(`public/user/licence/download?idLicence=${idlicence}`)
  }

}
