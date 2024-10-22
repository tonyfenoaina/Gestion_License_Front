import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Basecomponent } from 'src/app/service/basecomponent';
import { GetobjectService } from 'src/app/service/getobject.service';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { PostobjectService } from 'src/app/service/postobject.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent extends Basecomponent  {
  size: any = 'large';
  selectedFile: File | null = null;
  name: string = '';
  fileName: string = 'Aucun fichier sélectionné';

  urlupdate = 'secure/admin/module/update';
  urladd = 'secure/admin/module/add';
  software:any;
  constructor(
    objectlistService: ObjectlistService,
    private objectService: PostobjectService,
    protected override nzMessageService: NzMessageService,
    protected override service: GetobjectService
  ) {
    // Initialisez les valeurs avant d'appeler `super()`
    const software = JSON.parse(localStorage.getItem('software') || '{}');
    const urlget = `secure/admin/module/getAll/${software.id}`;
    super(objectlistService,'secure/admin/module/search', urlget, 'secure/admin/module/delete', nzMessageService, service);
    this.software = software;
    this.namesearchid = 'software';
    this.searchid = software.id;
  }

  ngOnInit(): void {
    this.fetchData(this.currentPage, this.pageSize);
  }

  mapDataToFormFields(data: any): void {
    this.name = data.name;
  }

  deleteData(){
    this.id = null;
    this.name = '';
    this.selectedFile = null;
    this.fileName = 'Aucun fichier sélectionné';
  }

  createDataFromFormFields(): any {
    const formData = new FormData();
    const idsoftware = this.software.id;
    console.log(idsoftware)
    formData.append('software',idsoftware)
    console.log("eto")
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    formData.append('name',this.name);
    return formData;
  }

  async sendValues() {
    await this.handleSendValues(this.urlupdate, this.urladd, this.objectService);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }
}
