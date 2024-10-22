import { Component } from '@angular/core';
import { ObjectlistService } from 'src/app/service/objectlist.service';
import { Basecomponent } from 'src/app/service/basecomponent';
import { PostobjectService } from 'src/app/service/postobject.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetobjectService } from 'src/app/service/getobject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent extends Basecomponent {
  size: any = 'large';
  selectedFile: File | null = null;
  name: string = '';

  urlupdate = 'secure/admin/software/update';
  urladd = 'secure/admin/software/add';
  fileName: string = 'Aucun fichier sélectionné';
  constructor(
    objectlistService: ObjectlistService,
    private objectService: PostobjectService,
    protected override nzMessageService: NzMessageService,
    protected override service: GetobjectService, private router: Router
  ) {
    super(objectlistService,'secure/admin/software/search', 'secure/admin/software/getAll', 'secure/admin/software/delete', nzMessageService, service);
  }

  ngOnInit(): void {
    this.fetchData(this.currentPage, this.pageSize);
  }

  mapDataToFormFields(data: any): void {
    this.name = data.name;
  }

  deleteData() {
      this.id = null;
      this.name = '';
      this.selectedFile=null;
      this.fileName='Aucun fichier sélectionné';
  }

  createDataFromFormFields(): any {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    formData.append('name',this.name);
    return formData;
  }

  async sendValues(event: Event): Promise<void>{
    await this.handleSendValues(this.urlupdate, this.urladd, this.objectService);
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }

  listModule(software:any){
    const data:any = {id:software.id, name:software.name}
    localStorage.setItem('software',JSON.stringify(data));
    this.router.navigate(['/module']);
  }
}
