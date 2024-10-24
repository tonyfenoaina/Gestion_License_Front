import { Component } from '@angular/core';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { Basecomponent } from 'src/app/service/basecomponent';
import { PostobjectService } from 'src/app/service/postobject.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetobjectService } from 'src/app/service/getobject.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends Basecomponent {
  size: any = 'large';

  firstname?: string | '';
  email?: string | '';
  contact?: string | '';
  surname?: string | '';
  password?: string | '';
  confirmPassword?: string | '';

  urlupdate = 'secure/user/update/data';
  urladd = 'secure/admin/users/add';

  constructor(
    objectlistService: ObjectlistService,
    private objectService: PostobjectService,
     protected override nzMessageService: NzMessageService,
     protected override service: GetobjectService
  ) {
    super(objectlistService,'secure/admin/users/search', 'secure/admin/users/getUser','secure/admin/users/delete', nzMessageService, service);
  }

  ngOnInit(): void {
    this.fetchData(this.currentPage, this.pageSize);
  }

  mapDataToFormFields(data: any): void {
    this.firstname = data.firstname;
    this.email = data.email;
    this.contact = data.contact;
    this.surname = data.surname;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }

  deleteData(){
    this.id = null;
    this.firstname = '';
    this.email = '';
    this.contact ='';
    this.surname = '';
    this.password = '';
    this.confirmPassword = '';
  }

  createDataFromFormFields(): any {
    return {
      email: this.email,
      surname: this.surname,
      firstname: this.firstname,
      password: (this.password === this.confirmPassword) ? this.password : null,
      contact: this.contact,
    };
  }

  async sendValues() {
    await this.handleSendValues(this.urlupdate, this.urladd, this.objectService);
  }
}
