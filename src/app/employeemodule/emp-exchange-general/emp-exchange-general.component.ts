import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import{ EmployeeService} from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../service/auth-service.service';
import * as $ from 'jquery';
import * as XLSX from 'xlsx'; 

import { ExchangeService } from "../../service/exchange.service";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ContactService } from 'src/app/service/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-emp-exchange-general',
  templateUrl: './emp-exchange-general.component.html',
  styleUrls: ['./emp-exchange-general.component.css']
})
export class EmpExchangeGeneralComponent implements OnInit {
 
  addContactForm:FormGroup;
 Contacts: any = {userTypeId:3,TwofactorConfig :2};
  datePickerConfig = { format: 'MM/DD/YYYY' };
  form: FormGroup;
  identification: FormGroup;
  fileName: any;
  file: any;
  duplicateexchange:any={PropertyTransactionId:0};

  onDisabledShow: boolean = false;
  onEnabledShow: boolean = true;
  ruleFromToggle: boolean = true;
  templateDuplicateToggle: boolean = true;
  exchange: any = {
    exchangeCloseOutModel: {}
  };
  Notes: any = {};
  totalBalance: any = 0;
  totalIdentifyValue: any = 0;
  ExchangeId: number;
  PropertyId: string;
  accountState: string = "add";
  propertyDropdown: any = [];
  customFieldsRelinquish: any = [];
  customFieldsReplacement: any = [];
  relinquished: any = [];
  filesSelected: any = [];
  userDetails: any = [];
  DocumentType: any = { type: 'Exchange', replacetype: 'Exchange' ,documentType:0,documentdesignatedslot:0};
  ApplyTemplateList: any = [];
  ApplyTemplate: any = { templateId: '' };
  noteTab: string = "Internal";
  identificationState: string = "add";
  public NotesInternal: any = [];
  public NotesExternal: any = [];
  isRelinquisEdit: boolean = false;
  is3propertysatisfy: boolean = false;
  is200propertysatisfy: boolean = false;
  isReplaceEdit: boolean = false;
  replacementList: any = [];
  DuplicateFromList: any = [];
  DuplicateToList: any = [];
  Documentslotlist:any=[];
  exchangeedit:boolean=false;
  SynergyContactDropdownList: any = [];
  SynergyContactDropdownListSearch: any = [];
  closeResult: string;
  NotesCountInternal:number;
  NotesCountExternal:number;
  getDismissReason: any;
  ContactsCF: any;
  idpropertydata:any = [];
  propertyTRasactionIds:any;

  constructor(private formBuilder: FormBuilder, private exchangeService: ExchangeService,
    private cdRef: ChangeDetectorRef, private EmployeeService: EmployeeService,
    private contactservice: ContactService,

    private modalService:NgbModal,
    private AuthServiceService: AuthServiceService,
    private router:Router,
    private toastr: ToastrService, private activated_route: ActivatedRoute, private ExchangeService: ExchangeService, private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      accounts: this.formBuilder.array([]),
    });
    debugger;
    this.activated_route.params.subscribe((params: any) => {
      this.ExchangeId = params['id'];
      this.PropertyId = params['id2'];
      this.getExchangeById();
      this.getReplacement();
      this.getDropdownList();
      this.getContactdropdownList();
    });
    this.identification = this.formBuilder.group({
      createdBy: new FormControl(1),
      exchangeId: new FormControl(0),
      thirdProperty: this.formBuilder.array([]),
      secondProperty: this.formBuilder.array([]),
      intendToAquire: new FormControl(0)
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {


    this.addContactForm = this.formBuilder.group({
      "userTypeId": ['', Validators.required],
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "emailAddress": ['', Validators.required],
      "mobileNumber": ['', Validators.required],
      "officeNumber": ['', Validators.required],
      "faxNumber": ['', Validators.required],
      "address": ['', Validators.required],
      "notes": ['', Validators.required]
     })
    $(function () {
      $('nav a[href^="/exchange/view' + location.pathname.split("/exchange/view")[1] + '"]');
      //console.log("fff",$('nav a[href^="/exchange/view' + location.pathname.split("/exchange/view")[1] + '"]'));
    });
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    console.log("user details", this.userDetails)
    this.getNotes();
  }
  /*table edit*/
  onEdit() {
    this.onDisabledShow = !this.onDisabledShow;
    this.onEnabledShow = !this.onDisabledShow;
    if (this.onDisabledShow) {
      $('.disabled_input').prop("disabled", this.onEnabledShow).addClass("enabled_inputBg");
    } else {
      $('.disabled_input').prop("disabled", this.onEnabledShow).removeClass("enabled_inputBg");
    }

  }

  accountSubmit() {
    var self = this;
    let accounts: any = <FormArray>self.form.get('accounts');
    self.exchangeService._addtransaction(accounts.value, self.accountState).subscribe((res: any) => {
      console.log("res ", res);
      self.onEdit();
      self.form.controls['accounts'] = self.formBuilder.array([]);
      var data = res.userData;
      data.forEach((item: any) => {
        self.addTransaction(item);
      });
      console.log("accounts ", accounts);

    })
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onChange(file: any) {
    console.log("file ", file);
    var self = this;
    self.file = file.files[0];
    self.fileName = file.files[0].name;
  }

  onSelectMultipleFile(event: any) {
    debugger;
    console.log("file ", event.target.files);
    for (var i = 0; i < event.target.files.length; i++){
      if (event.target.files[i]) {
        console.log("file ===>onUploadMultipleFile", event.target.files[i].name);
        console.log(" file.files ", event.target.files[i]);
        var file = event.target.files[i]
        file.date = new Date()
        this.filesSelected.push(file)
        console.log("this.filesSelected ", this.filesSelected);
      }
    }

  }
  uploadAllFilesReplacement(propertyid: string, propertytransid: string) {

    const formData = new FormData();
    if (this.filesSelected.length == 0) {
      this.toastr.error('Please select a file to Upload');
    }
    else {
      for (var i = 0; i < this.filesSelected.length; i++) {
        formData.append("file[]", this.filesSelected[i]);
        formData.append('DocumentType', this.filesSelected[i].documentType.toString());
        formData.append('ExtensionId',this.filesSelected[i].documentdesignatedslot);
      }

      formData.append('CreatedBy', this.userDetails['userId']);
      formData.append('propertyId', propertyid);
      formData.append('PropertyTrasactionId', propertytransid);
      formData.append('IsFinalClosingDocument', 'false');

      console.log("formData ==>uploadAllFiles", formData.get('file'));
      var self = this;
      self.exchangeService._UploadreplaceDocuments(formData).subscribe((data: any) => {
        if (data.isreponseSuccess == true) {
          debugger;
          this.toastr.success('uploaded successfully');
        }
        else {
          this.toastr.error('Failed');
        }
      }, () => {

      })
    }

  }


  uploadAllFiles() {
    debugger;
    const formData = new FormData();
    if (this.filesSelected.length == 0) {
      this.toastr.error('Please select a file to Upload');
    }
    else {
      for (var i = 0; i < this.filesSelected.length; i++) {
        formData.append("file[]", this.filesSelected[i]);
        formData.append('DocumentType', this.filesSelected[i].documentType.toString());
        formData.append('ExtensionId',this.filesSelected[i].documentdesignatedslot);
      }

      formData.append('CreatedBy', this.userDetails['userId']);
      formData.append('propertyId', this.PropertyId);
      formData.append('IsFinalClosingDocument', 'false');

      console.log("formData ==>uploadAllFiles", formData.get('file'));
      var self = this;
      self.exchangeService._UploadAllDocuments(formData).subscribe((data: any) => {
        if (data.isreponseSuccess == true) {
          debugger;
          this.toastr.success('uploaded successfully');
        }
        else {
          this.toastr.error('Failed');
        }
      }, () => {

      })
    }


  }
  Updateexchangenumber() {
    debugger;
   let jsonObj = {
    "exchangeID": +this.ExchangeId,
    "exchangeNumber": this.exchange.exchangeNumber,
    "relinquishedAdddress": this.exchange.propertyAddress,
    "replacementAddress": " ",
    "specilaInstructions": this.exchange.note

    }
    this.ExchangeService.postApiCall("/api/V1/Exchange/EditExchangeHeader", jsonObj).subscribe(success => {
      debugger;
      this.exchangeedit = false;

    }, error => {

    })


}

getUserData(cId:any,modal:any){

  this._getContactdetails_byId(cId)
  this.open(modal);
 }

 _getContactdetails_byId(ContactId: number) {
   debugger;
   this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
     console.log(data);

     //debugger;
     this.Contacts = data['userData'];
    this.ContactsCF=data['userData']['cfTransationsModel_'];


   })
 }


 open(content) {
  this.modalService.open(content,{size: 'xl', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  editexchange()
  {
 var self = this;
    self.exchangeedit = !self.exchangeedit;
  }

  removeFile() {
    var self = this;
    self.file = null;
    self.fileName = '';
  }

  applyTemplateDuplicateToggle(tabName: string) {
    var self = this;
    self.templateDuplicateToggle = (tabName == "general" || tabName == "relinquished" || tabName == "closeout") ? true : false;
  }

  getExchangeById() {
    debugger;
    var self = this;
    self.exchangeService._get_ExchangeById(this.ExchangeId).subscribe((response: any) => {
      // console.log("response getExchangeById", response);
      self.exchange = response.userData;
      console.log("self.exchange",self.exchange );

      self.propertyDropdown = self.exchange.propertyDropdownList;
      self.relinquished = self.exchange.relinquished;
      self.customFieldsRelinquish = self.relinquished.customFields;
      let latest_date = this.datePipe.transform(response['userData']['relinquished']['relPropertyClosedate'],'MM/dd/yyyy');
      self.exchange.relinquished.relPropertyClosedate=latest_date;
      self.identification.controls['exchangeId'].setValue(self.exchange.exchangeId);
      console.log("self.identification ", self.identification);
      console.log("self.exchange ", self.exchange);
      console.log("self.customFields ", self.customFieldsRelinquish);
      self.ruleFromToggle = self.exchange.is3PropertyRule;
      if (self.exchange.transactionsList.length == 0) {
        self.addTransaction(null);
      } else {
        self.accountState = "edit";
        self.exchange.transactionsList.forEach((item: any) => {
          self.addTransaction(item);
        });
      }
      
      var thirdpropertyData = self.ruleFromToggle == true ? self.exchange.propertyIdentifyList : [];
      for (let i = 0; i < 3; i++) {
        this.formControlThird(thirdpropertyData[i]);
      }

      var secondProperty = self.ruleFromToggle == false ? self.exchange.propertyIdentifyList : [];

      if (secondProperty.length > 0) {
        for (let i = 0; i < secondProperty.length; i++) {
          this.addSecondProperty(secondProperty[i]);
        }
      } else {
        const secondProperty = <FormArray>self.identification.get('secondProperty');
        for(var i=0;i<=3;i++){

          secondProperty.push(new FormGroup({
            propertyTransactionsId: new FormControl(0),

            propertyAddress: new FormControl(''),
            acquiring: new FormControl(100),
            amount: new FormControl(0),
          }))
        }
      }


    })
  }

  getReplacement() {
    debugger;
    var self = this;
    self.exchangeService._get_ReplacementList(this.ExchangeId).subscribe((response: any) => {
      console.log("response ==>getReplacement", response);
      self.replacementList = response.userData;
      self.customFieldsReplacement = response.userData.customFields;
    })
  }

  addTransaction(data: any) {
    var self = this;
    const accounts = <FormArray>self.form.get('accounts');
    if (data) {
      accounts.push(new FormGroup({
        date: new FormControl(moment(new Date(data.date)).format('MM/DD/YYYY')),
        senderOrReceiver: new FormControl(data.senderOrReceiver),
        description: new FormControl(data.description),
        incomingAmount: new FormControl(data.incomingAmount),
        outgoingAmount: new FormControl(data.outgoingAmount),
        balance: new FormControl(data.balance),
        exchangeID: new FormControl(self.exchange.exchangeId),
        accountId: new FormControl(data.accountId)
      }))
    } else {
      accounts.push(new FormGroup({
        date: new FormControl(moment(new Date()).format('MM/DD/YYYY')),
        senderOrReceiver: new FormControl(''),
        description: new FormControl(''),
        incomingAmount: new FormControl(),
        outgoingAmount: new FormControl(),
        balance: new FormControl(0),
        createdBy: new FormControl(1),
        exchangeID: new FormControl(self.exchange.exchangeId),
        createdOn: new FormControl(new Date())
      }))
    }

  }

  formControlThird(data: any) {
    debugger;
    var self = this;
    const thirdProperty = <FormArray>self.identification.get('thirdProperty');

    if (data) {
      console.log('data', data);
      self.identificationState = 'edit'
      thirdProperty.push(new FormGroup({
        propertyTransactionsId: new FormControl(data.propertyTransactionsId),
        propertyId: new FormControl(data.propertyId),
        exchangeId: new FormControl(self.exchange.exchangeId),
        // propertTitle: new FormControl(''),
        propertyAddress: new FormControl(data.propertyAddress),
        acquiring: new FormControl(data.acquiring),
        // createdOn: new FormControl(new Date()),
        // count: new FormControl(0),
        amount: new FormControl(0),
        // createdBy: new FormControl(1),
      }))
    } else {
      thirdProperty.push(new FormGroup({
        propertyTransactionsId: new FormControl(0),

        exchangeId: new FormControl(self.exchange.exchangeId),
        // propertTitle: new FormControl(''),
        propertyAddress: new FormControl(''),
        acquiring: new FormControl(100),
        // createdOn: new FormControl(new Date()),
        // count: new FormControl(0),
        amount: new FormControl(0),
        // createdBy: new FormControl(1),
      }))
    }
  }

  addSecondProperty(data: any) {
    debugger;
    var self = this;
    const secondProperty = <FormArray>self.identification.get('secondProperty');
    if (data) {
      self.identificationState = 'edit'
      secondProperty.push(new FormGroup({
        propertyTransactionsId: new FormControl(data.propertyTransactionsId),
        propertyId: new FormControl(data.propertyId),
        // exchangeId: new FormControl(self.exchange.exchangeId),
        propertyAddress: new FormControl(data.propertyAddress),
        acquiring: new FormControl(data.acquiring),
        amount: new FormControl(parseInt(data.amount)),
      }))
    } else {
      secondProperty.push(new FormGroup({
        propertyTransactionsId: new FormControl(0),

        propertyAddress: new FormControl(''),
        acquiring: new FormControl(100),
        amount: new FormControl(0),
      }))
    }
  }
  getDropdownList() {
    debugger;
    this.ExchangeService._getDuplicatedropdown(this.ExchangeId).subscribe((data: any)=> {
       this.DuplicateFromList = data.userData.exchangeNumberList;
       this.DuplicateToList = data.userData.exchangeDDList;
      console.log(data);
      }, error => {

      })

  }

  duplicateexchangeval(Transid:number,Toid:number)
  {
    debugger;
    console.log("value",this.duplicateexchange);
    if(Transid==null||Toid==0||Toid==null)
    {
      this.toastr.error("Please select required fields")
    }
    else{
      this.ExchangeService._getDuplicatevalue(this.ExchangeId,Transid,Toid).subscribe((data: any)=> {
        console.log("duplicatedvalue",this.duplicateexchange)
        this.toastr.success("Duplicated Successfully ")
        document.getElementById('dialog_box').click();
            }, error => {

            })
    }

  }
  getControls() {
    var self = this;
    var accounts: any = (self.form.get('accounts') as FormArray);
    self.totalBalance = accounts.value[accounts.value.length - 1]?.balance ? accounts.value[accounts.value.length - 1].balance : 0;
    return (self.form.get('accounts') as FormArray).controls;
  }

  isValueExits(i: number, field: string) {
    return this.getControls()[i].value[field] ? true : false;
  }

  getThirdProperty() {
    var self = this;
    return (self.identification.get('thirdProperty') as FormArray).controls;
  }

  getSecondProperty() {
    var self = this;
    var secondProperty: any = (self.identification.get('secondProperty') as FormArray);
    var value = 0
    secondProperty.value.filter((item: any) => {
      value += parseInt(item.amount);
    });
    self.totalIdentifyValue = value;
    return (self.identification.get('secondProperty') as FormArray).controls;
  }

  getbalance(data: any, i: number) {
    if (this.getControls()[i - 1]?.value) {
      var balance = 0
      if (this.getControls()[i].value.incomingAmount) {
        balance = this.getControls()[i - 1].value.balance + this.getControls()[i].value.incomingAmount;
      } else {
        balance = this.getControls()[i - 1].value.balance - this.getControls()[i].value.outgoingAmount;
      }
      data.value.balance = balance;
      return balance;
    } else {
      data.value.balance = data.value.incomingAmount - data.value.outgoingAmount;
      return data.value.incomingAmount - data.value.outgoingAmount;
    }

  }

  selectPropertyTitle(i: number) {
    var self = this;
    var filterData = self.propertyDropdown.filter((item: any) => item.propertyId == self.getThirdProperty()[i].value.propertyId)
    console.log("self.getThirdProperty()[i].value ", self.getThirdProperty()[i].value);
    console.log("filterData ", filterData);
    const control: any = (<FormArray>this.identification.controls['thirdProperty']).at(i);
    control['controls'].propertyAddress.setValue(filterData[0].propertyAddress);
    control['controls'].propertyId.setValue(filterData[0].propertyId);
  }

  setSecondPropertyAddr(i: number) {
    var self = this;
    var filterData = self.propertyDropdown.filter((item: any) => item.propertyId == self.getSecondProperty()[i].value.propertyId)
    const control: any = (<FormArray>this.identification.controls['secondProperty']).at(i);
    control['controls'].propertyAddress.setValue(filterData[0].propertyAddress);
    control['controls'].propertyId.setValue(filterData[0].propertyId);
  }

  saveIdForm() {

    debugger;
    var self = this;
    console.log("this.identification ", self.identification);
    var formData: any = {};
    formData['exchangeId'] = this.identification.value.exchangeId;
    formData['createdBy'] = this.identification.value.createdBy;
    formData['createdOn'] = new Date();
    if (this.ruleFromToggle == true) {
    //this.propertychange('thirdProperty');
      formData['iIntendToAquire'] = this.identification.value.intendToAquire;
      formData['is3PropertyRule'] = true;
      formData['is200PerRule'] = false;
      formData['propertyList'] = <FormArray>self.identification.get('thirdProperty').value.slice(0, formData['iIntendToAquire']);
    } else {
      //this.propertychange('secondProperty');
      formData['is3PropertyRule'] = false;
      formData['is200PerRule'] = true;
      formData['iIntendToAquire'] = this.identification.value.secondProperty.length;

    var data:any= this.identification.value.secondProperty;
    var sendData=data.filter((item: any) => (item.amount != 0 && item.amount != null));

    formData['propertyList']=sendData;
    }
    console.log("formData ", formData);
    if(this.ruleFromToggle == true && this.identification.value.intendToAquire==0)
    {
      this.is3propertysatisfy=true
    }
    if(this.ruleFromToggle != true && self.totalIdentifyValue > self.exchange.money200PerRuleLimit)
    {
      this.is200propertysatisfy=true
    }
    if(this.is3propertysatisfy==false&& this.is200propertysatisfy==false)
    {
      self.exchangeService._saveOrUpdateIdForm(formData, self.identificationState).subscribe((response: any) => {
        console.log("response ", response);
        self.identificationState = 'edit';
        self.getReplacement();
        if (this.ruleFromToggle == true) {
          self.identification.controls['thirdProperty'] = self.formBuilder.array([]);
          var data = response.userData;
          for (let i = 0; i < 3; i++) {
            this.formControlThird(data[i]);
          }
        }
        else {
          self.identification.controls['secondProperty'] = self.formBuilder.array([]);
          var data = response.userData;
          data.forEach((item: any) => {
            this.addSecondProperty(item);
          });
        }
        console.log("identification ", self.identification);

      }, err => {
        console.log("err ", err);

      })

    }
    else
    {
      if(this.is200propertysatisfy==true)
      {
        var euroCurrency 
        euroCurrency = '$' + self.exchange.money200PerRuleLimit.toLocaleString("en-US");
        this.open('The total aggregate value you have identified exceeds 200% of your relinquished property sales price. Please adjust your identification form.Note: Your value limit is: '+euroCurrency);
      }
      else if(this.is3propertysatisfy==true){


        this.toastr.error("Please select intend property require")
      }
    }






    }

  propertychange(property: string) {
    debugger;
    let jsonObj;
    if (property == 'secondProperty') {
      jsonObj = {

        "exchangeId": +this.ExchangeId,
        "is3PropertyRule": false,
        "is200PerRule": true
      }
    }
    else {
      jsonObj = {

        "exchangeId": +this.ExchangeId,
        "is3PropertyRule": true,
        "is200PerRule": false
      }
    }

    // return false;

    this.ExchangeService.postApiCall("/api/V1/Exchange/PropertyRuleChange", jsonObj).subscribe(success => {
      debugger;
      this.ruleFromToggle = !this.ruleFromToggle

    }, error => {

    })
  }
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');

  }

  Downloadexchangedocs() {
    debugger;
    this.EmployeeService._get_exchangedocs(+this.PropertyId).subscribe((data: any) => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, () => {

    })
  }

  DownloadexchangedocsReplacement(propertyid: number) {
    debugger;
    this.EmployeeService._get_exchangedocs(propertyid).subscribe((data: any) => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, () => {

    })
  }

  isEditOrCancelRel() {
    var self = this;
    self.isRelinquisEdit = !self.isRelinquisEdit;
  }
  isEditOrCancelRep() {
    var self = this;
    self.isReplaceEdit = !self.isReplaceEdit;
  }
  updateReplacement(propertytranid: number, i: number) {
    debugger;
    var self = this;
    console.log("self.exchange ", self.replacementList);
    console.log("self.exchange ", self.customFieldsRelinquish);

    if(isNaN(self.replacementList[i].escrowOfficerName))
    {
      self.replacementList[i].escrowOfficerName=0;
    }

    let jsonObj = {


       "agentOfficerId": parseInt(self.replacementList[i].escrowOfficerName),
      "propertyAddress": self.replacementList[i].propertyAddress,
      "exchangeId":this.ExchangeId,
      "propertyTrasactionId": propertytranid,
      "userId": this.userDetails['userId'],
      "ownershipInterest": self.replacementList[i].ownerShipInterest,
      "purchasePrice": self.replacementList[i].salesPrice,
      "date": new Date(),

      "customFields": self.replacementList[i].customFields?self.replacementList[i].customFields:[]

      //userDetails['userId'],
    }

    this.ExchangeService.postApiCall("/api/V1/Exchange/UpdateReplacement", jsonObj).subscribe(success => {
      debugger;
      this.toastr.success('updated successfully');
      self.isReplaceEdit = !self.isReplaceEdit;
      this.getDropdownList();
      window.location.reload();
      //this.route.navigate(['exchange/approval/list']);
    }, error => {

    })
  }

  updateRelinquish() {
    debugger;
    var self = this;
    console.log("self.exchange ", self.exchange.relinquished);
    console.log("self.exchange ", self.customFieldsRelinquish);
   if(isNaN(self.exchange.relinquished.escrowOfficerName))
   {
    self.exchange.relinquished.escrowOfficerName=0;
   }

    let jsonObj = {

      "officerId": parseInt(self.exchange.relinquished.escrowOfficerName),
      "propertyTitle":  self.exchange.relinquished.propertyTitle,
      "salesPrice":  self.exchange.relinquished.salesPrice?self.exchange.relinquished.salesPrice:0,
      "currentDebtOnProperty": self.exchange.relinquished.currentDebtOnProperty?self.exchange.relinquished.currentDebtOnProperty:0,
      "ownershipPerInterest":  self.exchange.relinquished.ownerShipInterest? self.exchange.relinquished.ownerShipInterest:0,
      "exchangeId": self.exchange.relinquished.exchangeId,
      "userId": this.userDetails['userId'],
      "date": new Date(),
      "interestPayable": self.exchange.relinquished.interestPayableToExchanger,
      "relPropertyClosedate": new Date(self.exchange.relinquished.relPropertyClosedate),
      "customFields": self.customFieldsRelinquish
    }

    this.ExchangeService.postApiCall("/api/V1/Exchange/UpdateRelinqueshed", jsonObj).subscribe(success => {
      debugger;
      this.toastr.success('updated successfully');
      self.isRelinquisEdit = !self.isRelinquisEdit;
      this.getDropdownList();
      window.location.reload();
      //this.route.navigate(['exchange/approval/list']);
    }, error => {

    })
  }



  closeOutPacket() {
    debugger;
    var self = this;
    console.log("self.exchange.exchangeCloseOutModel ", self.exchange.exchangeCloseOutModel);
    let jsonObj = {

      "exchangeId": +this.ExchangeId,
      "directTransfer": self.exchange.exchangeCloseOutModel.directTransfer,
      "exchangeFeeReceived": self.exchange.exchangeCloseOutModel.exchangeFeeReceived,
      "identified": self.exchange.exchangeCloseOutModel.identified,
      "bankrefferal": self.exchange.exchangeCloseOutModel.bankrefferal,
      "ownershipInterest": self.exchange.exchangeCloseOutModel.ownershipInterest,
      "salesPrice": self.exchange.exchangeCloseOutModel.salesPrice,
      "accountbalance": self.exchange.exchangeCloseOutModel.accountbalance,
      "mortgageBoot": self.exchange.exchangeCloseOutModel.mortgageBoot,
      "caTransaction": self.exchange.exchangeCloseOutModel.caTransaction,
      "exemptFromWithholding": self.exchange.exchangeCloseOutModel.exemptFromWithholding,
      "failedExchange": self.exchange.exchangeCloseOutModel.failedExchange,
      "withholdingAmount": self.exchange.exchangeCloseOutModel.withholdingAmount,
      "wireFee": self.exchange.exchangeCloseOutModel.wireFee,
      "amountBeingReleasedtoClient": self.exchange.exchangeCloseOutModel.amountBeingReleasedtoClient,
      "alternativeWithHolding":self.exchange.exchangeCloseOutModel.alternativeWithHolding,
      "alternativeWithHoldingAmount":self.exchange.exchangeCloseOutModel.alternativeWithHoldingAmount ,
      "relinquishedOwnershipInterest":self.exchange.exchangeCloseOutModel.relinquishedOwnershipInterest ,
      "isCloseOut": true,
      "updatedBy": this.userDetails['userId'],
      "updatedOn": new Date()

      //userDetails['userId'],
    }

    this.ExchangeService.postApiCall("/api/V1/Exchange/CloseOutExchange", jsonObj).subscribe(success => {
      debugger;
      this.toastr.success('Exchange closed out successfully');
      //this.route.navigate(['exchange/approval/list']);
    }, error => {

    })
  }
  ApplytemplateDownload() {
    debugger;
    let ContactId = this.ApplyTemplateList.contactId;
    let ExchangeId = this.ApplyTemplateList.exchangeId;
    let TemplateId = this.ApplyTemplate.templateId;
    var self = this;
    if(TemplateId!="")
    {
      self.exchangeService._DownloadApplyTemplate(TemplateId, ContactId, ExchangeId).subscribe((data: any) => {
        console.log(data)
        debugger;
        this.ApplyTemplateList.Documentname = "Template.docx";
        this.ApplyTemplateList = data.resPath;
        const a: any = document.createElement('a');
        a.style = 'display: none';
        document.body.appendChild(a);
        const url = this.ApplyTemplateList;
        window.open(url);
        a.download = "Template.docx";
        a.click();
        document.getElementById('dialog_box_10').click();
      })

    }
    else
    {
      this.toastr.error("Please select template")
    }
    }

  ApplyTemplatedropdownList() {
    debugger;
    var self = this;
    self.exchangeService._ApplyTemplateDropdown(self.exchange.exchangeId, this.userDetails['userId']).subscribe((data: any) => {
      console.log(data)
      debugger;
      this.ApplyTemplateList = data['userData'];
    })
  }
  DownloadIDform() {
    debugger;
    this.EmployeeService._get_IDforms(this.ExchangeId).subscribe((data: any) => {
      this.ApplyTemplateList = data.userData;
      const a: any = document.createElement('a');
      a.style = 'display: none';
      document.body.appendChild(a);
      const url = this.ApplyTemplateList;
      window.open(url);
      a.download = "Template.docx";
      a.click();
    }, () => {

    })
  }
  GenerateExchangeDocumentReplacement(propertyid: number) {
    debugger;
    this.EmployeeService._get_ExchangeDocument(propertyid).subscribe((data: any) => {
      debugger;
      this.ApplyTemplateList = data.resPath;
      const a: any = document.createElement('a');
      a.style = 'display: none';
      document.body.appendChild(a);
      const url = this.ApplyTemplateList;
      window.open(url);
      a.download = "Template.pdf";
      a.click();
    }, () => {

    })
  }
  GenerateExchangeDocument() {
    debugger;
    this.EmployeeService._get_ExchangeDocument(+this.PropertyId).subscribe((data: any) => {
      debugger;
      this.ApplyTemplateList = data.resPath;
      const a: any = document.createElement('a');
      a.style = 'display: none';
      document.body.appendChild(a);
      const url = this.ApplyTemplateList;
      window.open(url);
      a.download = "Template.pdf";
      a.click();
    }, () => {

    })
  }
  selectednotetab(value: string) {
    this.EmployeeService._Read_Notes(+this.ExchangeId,this.userDetails['userId'],true).subscribe((data: any) => {

    }, () => {

    })
    this.noteTab = value;
  }
  getNotes() {
    debugger;
    this.EmployeeService._get_Notes(+this.ExchangeId,this.userDetails['userId']).subscribe((data: any) => {
      this.NotesInternal = data.userData.internalList;
      this.NotesExternal = data.userData.generalList;
      this.NotesCountInternal=data.userData.generalUnReadCount;
      this.NotesCountExternal=data.userData.internalUnReadCount;
      console.log('datd vale',data);
    }, () => {

    })
  }
  Addnotes() {
    debugger;
    // let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    let jsonObj = {
      "exchangeId": +this.ExchangeId,
      "userId": this.userDetails['userId'],
      "private": this.noteTab == 'Internal' ? 1 : 0,
      "messageBody": this.Notes.Note,
      "dateTime": new Date()
    }

    this.EmployeeService._add_Notes(jsonObj).subscribe((data: any) => {
      debugger;
      if (data.iSsuccessResponse == true) {
        // this.getNotes();
        if (this.noteTab == 'Internal') {
          this.NotesInternal.push(jsonObj);
        }
        else {
          this.NotesExternal.push(jsonObj);
        }
        this.Notes.Note = "";
        this.getNotes();
        this.toastr.success("Notes Saved Successfully");
        //location.reload();
      }
      else {
        this.toastr.error(data.error);
      }
    }, (error: any) => {

    })

  }
  getdocumentslotList(item:any) {
    debugger;
    this.ExchangeService._getdocumentslotlist(item.documentType).subscribe((data: any)=> {
      this.Documentslotlist = data.userData;
      item.Documentslotlist = data.userData;
      console.log(data);
      }, error => {

      })

  }
  getContactdropdownList() {
    debugger;

      this.contactservice._ContactListDropdownVal().subscribe((data: any) => {
        console.log(data)
        debugger;
        this.SynergyContactDropdownList = data['userData'];
        this.SynergyContactDropdownListSearch=data['userData'];
        })

    }

     getpropertyvalue(id:number,event:any)
     {
       debugger;
       console.log(event);
       if(event == true){
          this.idpropertydata.push(id);
       console.log(this.idpropertydata,"idpropertydata")
         var stringFromArr = this.idpropertydata.join(',');
         this.propertyTRasactionIds = stringFromArr;
         console.log(stringFromArr,"stringFromArr");
        console.log(this.propertyTRasactionIds,"propertyTRasactionIds");
      }else{
         this.idpropertydata.pop(id);
        console.log(this.idpropertydata,"idpropertydata")
      var stringFromArr = this.idpropertydata.join(',');
        this.propertyTRasactionIds = stringFromArr;
          console.log(this.propertyTRasactionIds,"propertyTRasactionIds");
      }


   }
   deleteSecondProperty(i,data:any){
    //debugger;

    var self = this;
    const secondProperty = <FormArray>self.identification.get('secondProperty');
    secondProperty.removeAt(secondProperty.value.findIndex(image => image.id === i))
console.log("length",secondProperty.length)
}

identificationproperty(){
  let reqPayload = {
  "exchangeId":this.ExchangeId,
  "propertyTRasactionIds":this.propertyTRasactionIds,
  "isIdentifiedAprroved":true
  }
  console.log(reqPayload,"reqPayload");
  this.AuthServiceService.approveProperty(reqPayload).subscribe((data: any) => {
    //this.route.navigate(['superadmin/dashboard']);
    this.getReplacement();
    this.toastr.success("Approved Successfully")
     console.log(data);
   })
}

   createData(){
this.router.navigate(['/employee/emp-create-exchange',{id:this.ExchangeId}])
   }
}
