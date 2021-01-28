import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../service/template.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-emp-document-template',
  templateUrl: './emp-document-template.component.html',
  styleUrls: ['./emp-document-template.component.css']
})
export class EmpDocumentTemplateComponent implements OnInit {

  public TemplateData: any = [];
  CreatedUser: string;
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  fileName: any;
  file: any;
  templateid:number;
  
  
  onDisabledShow:boolean = false;
  onEnabledShow:boolean = true;
  public DbExchangeList: any = [];
  searchText: string;
  submitted = false;
  label : string;
  constructor(
    private TemplateService: TemplateService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activated_route: ActivatedRoute
  ) {
    
    this.masterSelected = false;

    this.getCheckedItemList();
   
  }
  ngOnInit(): void {
    debugger;
    this.label ='ADD';
    this.activated_route.params.subscribe(params => {
      this.templateid = Number(params['id']);
    });
    this.label ='CREATE';
    let customid = Number.isNaN(this.templateid);
    if (customid != true) {
      this.label ='UPDATE';
      //this.updateNegotiator = true;
      // this._getcustomfields_byId()
      }
    this.GetTemplateDetails();
    
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll() {
    
  }
  isAllSelected() {
   
  }

  getCheckedItemList() {
     }
  onEdit()
  {
    this.onDisabledShow = true;
    this.onEnabledShow = false;
    $('.disabled_input').prop("disabled", false).addClass("enabled_inputBg");
  }
  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onChange(file:any) {
    this.file = file.files[0];
    this.fileName = file.files[0].name;
  }

  removeFile() {
    this.file = null;
    this.fileName = '';
  }

 
  close(){
    debugger;
    this.TemplateData.templateName ='';
    this.TemplateData.sharing ='';
    this.TemplateData.description='';
    this.file = null;
    this.fileName = '';
  }

  AddTemplate() {
    debugger;
    //this.submitted = true;
    if(this.label=='UPDATE')
    {
      debugger;
      let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
      let jsonObj = {
  "TemplateId": this.templateid,
  "TemplateName": this.TemplateData.templateName,
  "Description": this.TemplateData.description,
  "Sharing":  this.TemplateData.sharing,
  "updatedBy": userDetails['userId'],
  "updatedOn": new Date(),
  "File": this.file
       
      }
      this.TemplateService._Edittemplate(jsonObj).subscribe((data:any)=> {
        if(data.iSsuccessResponse == true)
        {
        this.GetTemplateDetails();
        document.getElementById('close-modal').click();
        this.toastr.success('Uploaded Successfully');
  
        }
        else
        {
          this.toastr.error(data.error);
        }
      }, 
      )
    }
    else
    {
      if(this.TemplateData.templateName==null||this.TemplateData.sharing==null||this.file==null||this.file==undefined||this.TemplateData.templateName==undefined||this.TemplateData.sharing==undefined)
      {
        this.toastr.error('Please select required fields');
      }
      else
      { let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
      let jsonObj = {
       "UserId": userDetails['userId'],
       "TemplateName": this.TemplateData.templateName,
       "Sharing": this.TemplateData.sharing,
       "Description": this.TemplateData.description,
       "File": this.file
     }
     this.TemplateService._addtemplate(jsonObj).subscribe((data:any)=> {
       if(data.iSsuccessResponse == true)
       {
       this.GetTemplateDetails();
       document.getElementById('close-modal').click();
       this.toastr.success('Uploaded Successfully');
 
       }
       else
       {
         this.toastr.error(data.error);
       }
     }, 
     )
     }}
     
    
  }
  

  GetTemplateDetails() {
    debugger;
   this.TemplateService._gettemplatedetails().subscribe((data:any) => {
      debugger;
      console.log(data)
     if(data.isreponseSuccess!=false)
     {
      this.TemplateData = data['documentTemplateModels'];
      this.DbExchangeList = data['documentTemplateModels'];
     }
       
      
    }, (error:any) => {

    })
    }
  
    onSearch(value: string){
      debugger;
   console.log("value ", value);
   
      var self = this;
      console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
      this.TemplateData = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
        if (a[k]) {
            return a[k].toString().toLowerCase().indexOf(value) > -1;
          
        }
        else{
          return false;
        }
      }));
    }
  DeleteTemplate() {
    debugger;
  
    this.TemplateService._deletetemplate(this.templateid).subscribe((data:any)=> {
      if(data.response == true)
      {
        debugger;
        this.GetTemplateDetails();
        this.toastr.success("Deleted Successfully");
      }
      else
      {
        this.toastr.error(data.error);
      }
      console.log(data)
    }, 
    )}
    OpenModal(templateid:number)
    {
 this.templateid=templateid;
    }

  GetTemplate(templateId: number) {
    debugger;
    this.label ='CREATE';
    this.templateid=templateId;
    let contactid = Number.isNaN(templateId);
    if (contactid != true) {
      this.label ='UPDATE';
      //this.updateNegotiator = true;
       
      }
    this.TemplateService._gettemplatebyid(templateId).subscribe((data:any) => {
      console.log(data)
      this.fileName =  data['response'].templateFileName;
      this.TemplateData = data['response'];
    }, 
    )}
  

  Search() {
    debugger;
    this.TemplateData = this.TemplateData.filter((res:any) => {
      return res.CreatedUser.toLocaleLowerCase().match(this.CreatedUser.toLocaleLowerCase());

    })
  }

}
