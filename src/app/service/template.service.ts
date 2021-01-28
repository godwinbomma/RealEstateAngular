import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private actionUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.actionUrl = environment.apiUrl;
  }
  _addtemplate(data: any): any {
    debugger;
    const formData: FormData = new FormData();
    formData.append('UserId', data.UserId);
    formData.append('TemplateName', data.TemplateName);
    formData.append('Sharing', data.Sharing);
    formData.append('Description', data.Description);
    formData.append('File', data.File);
    return this.http.post(this.actionUrl +'/api/V1/ManageTemplates/UploadTemplate',formData);
  }

  _Edittemplate(data: any): any {
    debugger;
    const formData: FormData = new FormData();
    formData.append('TemplateId',data.TemplateId);
    formData.append('UserId', data.updatedBy);
    formData.append('TemplateName', data.TemplateName);
    formData.append('Sharing', data.Sharing);
    formData.append('Description', data.Description);
    formData.append('File', data.File);
    return this.http.post(this.actionUrl +'/api/V1/ManageTemplates/EditTemplate',formData);
  }

  _gettemplatedetails() {
    debugger;
    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetTemplateDetails');
  }

  _deletetemplate(templateId: number) {
    debugger;
    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/DeleteTemplate?TemplateId=' + templateId);
  }

  _downloadtemplate(templateId: number) {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/DownloadTemplate?TemplateId=' + templateId);
  }

  _gettemplatebyid(templateId: number) {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetTemplateDetailsById?TemplateId='+templateId);
  }

  _searchtemplate(templateId: number) {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/SearchTemplate?TemplateId=' + templateId);
  }

  _addtemplatefields(data: any) {

    return this.http.post(this.actionUrl +'/api/V1/ManageTemplates/AddTemplateFields',data);
  }

  _getcontactfields() {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetContactFields');
  }

  _getexchangefields() {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetExchangeFields');
  }

  _getcontactfieldsbyname(name: string) {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetContactFieldByName?ContactFieldName='+ name);
  }

  _getExchangefieldsbyname(name: string) {

    return this.http.get(this.actionUrl +'/api/V1/ManageTemplates/GetExchangeFieldByName?ExchangeFieldName=' + name);
  }
}
