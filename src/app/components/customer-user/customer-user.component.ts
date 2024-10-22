import { Component } from '@angular/core';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { Basecomponent } from 'src/app/service/basecomponent';
import { PostobjectService } from 'src/app/service/postobject.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetobjectService } from 'src/app/service/getobject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-user',
  templateUrl: './customer-user.component.html',
  styleUrls: ['./customer-user.component.scss']
})
export class CustomerUserComponent extends Basecomponent {
  size: any = 'large';

  firstname?: string | '';
  email?: string | '';
  contact?: string | '';
  surname?: string | '';
  address?: string | '';

  urlupdate = 'api/customer/update';
  urladd = 'api/customer/add';

  constructor(
    objectlistService: ObjectlistService,
    private objectService: PostobjectService,
     protected override nzMessageService: NzMessageService,
     protected override service: GetobjectService,
     private router: Router
  ) {
    super(objectlistService,'api/customer/searchh', 'api/customer/getAll','api/customer/delete', nzMessageService, service);
  }

  ngOnInit(): void {
    this.fetchData(this.currentPage, this.pageSize);
  }

  actionUpdateUrl(data:any){
    this.urlupdate = `${this.urlupdate}/${data.id}`
    this.actionUpdate(data);
  }

mapDataToFormFields(data: any): void {
  this.surname = data.surname;
  this.firstname = data.firstname;
  this.contact = data.contact;
  this.email = data.email;
  this.address = data.address;
}

deleteData(): void {
  this.id = null;
  this.surname = '';
  this.firstname = '';
  this.contact = '';
  this.email = '';
  this.address = '';
}

createDataFromFormFields(): any {
  return {
    surname: this.surname,
    firstname: this.firstname,
    contact: this.contact,
    email: this.email,
    address: this.address,
  };
}

  async sendValues() {
    await this.handleSendValues(`${this.urlupdate}/${this.id}`, this.urladd, this.objectService);
    this.togglePopup()
  }

  listLicense(customer:any){
    const data:any = {id:customer.id, surname:customer.surname}
    localStorage.setItem('customer',JSON.stringify(data));
    console.log(data)
    this.router.navigate(['/licenses']);
  }
}
