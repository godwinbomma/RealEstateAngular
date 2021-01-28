import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  actionUrl: string;

  constructor(
    private http:HttpClient
  ) { 
    this.actionUrl = environment.apiUrl;
    
  }

  _add_role(data:any):Observable<any>{
    
return this.http.post(`${this.actionUrl}/api/V1/Contacts/AddRole`,data)
  }

update_role(data){
  return this.http.post(`${this.actionUrl}/api/V1/Contacts/UpdateRole`,data)
}



get_role_byContactId(ContactTypeId){
  
  return this.http.get(`${this.actionUrl}/api/V1/Contacts/GetDefaultPrevileges?ContactTypeId=${ContactTypeId}`)
}
}
