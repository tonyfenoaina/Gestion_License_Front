import { Component } from '@angular/core';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { Basecomponent } from 'src/app/service/basecomponent';
import { PostobjectService } from 'src/app/service/postobject.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetobjectService } from 'src/app/service/getobject.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends Basecomponent {
  size: any = 'large';

  surname?: string | '';
  firstname?: string | '';
  contact?: string | '';
  email?: string | '';
  address?: string | '';

  urlupdate = 'api/customer';
  urladd = 'api/customer/add';

  constructor(
    objectlistService: ObjectlistService,
    private objectService: PostobjectService,
     protected override nzMessageService: NzMessageService,
     protected override service: GetobjectService
  ) {
    super(objectlistService,'api/customer/searchh', 'api/customer/getAll','api/customer/delete', nzMessageService, service);
  }

  ngOnInit(): void {
    this.fetchData(this.currentPage, this.pageSize);
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
    await this.handleSendValues(this.urlupdate, this.urladd, this.objectService);
  }
}
