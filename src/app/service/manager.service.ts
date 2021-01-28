import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private  actionUrl  : string;
  private id : any;
  constructor(private http : HttpClient) { 
    this.actionUrl = environment.apiUrl;
   console.log(this.actionUrl,"url");
  }


  _add_manager(addmanager:any){
    return this.http.post(this.actionUrl+'/Managers/Add' ,addmanager);
 }

 _update_manager(editmanager:any){
  return this.http.put(this.actionUrl+'/Managers/Update',editmanager);
 }

 _get_All_manager(): any{
  return this.http.get(this.actionUrl+'/Managers/GetAll');
 }
 _get_managerByid(id:number){
  return this.http.post(this.actionUrl+'/Managers/Get?ManagerId='+id,{});
 }
 _delete_manager(id:number){
   return this.http.post(this.actionUrl+'/Managers/Delete',id);
 }
//  setId(id:any){
//    this.id = id
//  }
//  getId(){
//   return this.id;
//  }


//Add Broker

_add_broker(addmanager:any){
  return this.http.post(this.actionUrl+'/Brokers/Add' ,addmanager);
}

_update_broker(editmanager:any){
return this.http.post(this.actionUrl+'/Brokers/Update',editmanager);
}
_get_brokerByid(id:number){
return this.http.post(this.actionUrl+'/Brokers/Get?BrokerId='+id,{});
}
_delete_broker(id:number){
 return this.http.post(this.actionUrl+'/Brokers/Delete',id);
}
_get_All_Broker(): any{
  return this.http.get(this.actionUrl+'/Brokers/GetAll')
}


//Agents
_add_agent(addagent:any){
  return this.http.post(this.actionUrl+'/Agents/Add' ,addagent);
}

_update_agent(editagent:any){
return this.http.post(this.actionUrl+'/Agents/Update',editagent);
}
_get_agentByid(id:number){
return this.http.post(this.actionUrl+'/Agents/Get?BrokerId='+id,{});
}
_delete_agent(id:number){
 return this.http.post(this.actionUrl+'/Agents/Delete',id);
}
_get_All_agent(): any{
  return this.http.get(this.actionUrl+'/Agents/GetAll')
}


}

