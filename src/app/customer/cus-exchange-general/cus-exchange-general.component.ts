import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import{ EmployeeService} from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
import * as XLSX from 'xlsx'; 

import { ExchangeService } from "../../service/exchange.service";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ContactService } from 'src/app/service/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cus-exchange-general',
  templateUrl: './cus-exchange-general.component.html',
  styleUrls: ['./cus-exchange-general.component.css']
})
export class CusExchangeGeneralComponent implements OnInit {
  datePickerConfig = { format: 'MM/DD/YYYY' };
  form: FormGroup;
  identification: FormGroup;
  fileName: any;
  file: any;
  SettlementAgent:string;
  Exchanges: any = {contactid:'',Email:'',Phone:''};
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
  is3propertysatisfy: boolean = false;
  is200propertysatisfy: boolean = false;
  relinquished: any = [];
  filesSelected: any = [];
  userDetails: any = [];
  ApplyTemplateList: any = [];
  ApplyTemplate:any = {templateId:''};
  noteTab: string = "Internal";
  Status:string;
  DocumentType:any={type: 'Exchange', replacetype: 'Exchange' ,documentType:0,documentdesignatedslot:0};
  identificationState: string = "add";
  public NotesInternal: any = [];
  public NotesExternal: any = [];
  isRelinquisEdit: boolean = false;
  isReplaceEdit: boolean = false;
  replacementList: any = [];
  DuplicateFromList: any = [];
  DuplicateToList: any = [];
  duplicateexchange:any={PropertyTransactionId:0};
  Documentslotlist:any=[];
  exchangeedit:boolean=false;
  isIdentifiedAprroved:boolean=false;
  public date: any;
  TemplateData : any = [];
  ClientContactDropdownList: any = [];
  ClientContactDropdownListSearch: any = [];
  SynergyContactDropdownList: any = [];
  SynergyContactDropdownListSearch: any = [];
  Contacts : any ={userTypeId:3};
  Statedetails:any = [];
  Citydetails:any = [];
  Statedata:any = [];
  Citydata :any= [];
  closeResult: string;
  getDismissReason: any;
  constructor(private formBuilder: FormBuilder, private exchangeService: ExchangeService,
    private cdRef: ChangeDetectorRef, private EmployeeService: EmployeeService,  private contactservice: ContactService,  private modalService:NgbModal,
    private toastr: ToastrService, private activated_route: ActivatedRoute, private ExchangeService: ExchangeService, private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      accounts: this.formBuilder.array([]),
    });
    debugger;
    this.activated_route.params.subscribe((params: any) => {
      this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
      this.ExchangeId = params['id'];
      this.PropertyId = params['id2'];
      this.Status = params['id3'];
      this.getExchangeById();
     // this.getReplacement();
      this.getNotes();
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

    $(function () {
      $('nav a[href^="/exchange/view' + location.pathname.split("/exchange/view")[1] + '"]');
    });
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getNotes();
    this.getContactdropdownList();
    
    this.getStatelist();
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
    debugger;
    const formData = new FormData();
    if (this.filesSelected.length == 0) {
      this.toastr.error('Please select a file to Upload');
    }
    else {
      for (var i = 0; i < this.filesSelected.length; i++) {
        formData.append("file[]", this.filesSelected[i]);
      }

      formData.append('CreatedBy', this.userDetails['userId']);
      formData.append('propertyId', propertyid);
      formData.append('PropertyTrasactionId', propertytransid);
      formData.append('IsFinalClosingDocument', 'false');
      formData.append('DocumentType', this.DocumentType.documentType.toString());
      formData.append('ExtensionId',this.DocumentType.documentdesignatedslot);
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
      }

      formData.append('CreatedBy', this.userDetails['userId']);
      formData.append('propertyId', this.PropertyId);
      formData.append('IsFinalClosingDocument', 'false');
      formData.append('DocumentType', this.DocumentType.documentType.toString());
      formData.append('ExtensionId',this.DocumentType.documentdesignatedslot);
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
  isEditOrCancelRep() {
    var self = this;
    self.isReplaceEdit = !self.isReplaceEdit;
  }
  updateReplacement(propertytranid: number, i: number) {
    debugger;
    var self = this;
    console.log("self.exchange ", self.replacementList);
    console.log("self.exchange ", self.customFieldsRelinquish);
    let dateofbirth = this.datePipe.transform(new Date(self.exchange.relinquished.relPropertyClosedate), 'MM-DD-YYYY');
    let jsonObj = {
      "exchangeId": self.exchange.relinquished.exchangeId,
      "propertyTrasactionId": propertytranid,
      "userId": this.userDetails['userId'],
      "ownershipInterest": self.replacementList[i].ownerShipInterest,
      "purchasePrice": self.replacementList[i].salesPrice,
      "date": new Date(),

      "customFields": self.replacementList[i].customFields

      //userDetails['userId'],
    }

    this.ExchangeService.postApiCall("/api/V1/Exchange/UpdateReplacement", jsonObj).subscribe(success => {
      debugger;
      this.toastr.success('updated successfully');
      //this.route.navigate(['exchange/approval/list']);
    }, error => {

    })
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
    this.ExchangeService._getDuplicatevalue(this.ExchangeId,Transid,Toid).subscribe((data: any)=> {
  
      }, error => {
  
      })
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
      this.isIdentifiedAprroved=self.exchange.isIdentifiedAprroved;
      if( this.isIdentifiedAprroved==true)
    {
      this.getReplacement();
    }
      self.propertyDropdown = self.exchange.propertyDropdownList;
      self.relinquished = self.exchange.relinquished;
      self.customFieldsRelinquish = self.relinquished.customFields;
     
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
            acquiring: new FormControl(''),
            amount: new FormControl(''),
          }))
        }
        }
      
   


    })
  }

  getReplacement() {
    debugger;
    var self=this;
    
    self.exchangeService._get_ReplacementList(this.ExchangeId).subscribe((response: any) => {
      console.log("response ==>getReplacement", response);
      self.replacementList = response.userData;
      self.customFieldsReplacement =  response.userData.customFields;
    })
  
  }

  addTransaction(data: any) {
    var self = this;
    const accounts = <FormArray>self.form.get('accounts');
    if (data) {
      accounts.push(new FormGroup({
        date: new FormControl(moment(new Date(data.date)).format('DD/MM/YYYY')),
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
        date: new FormControl(moment(new Date()).format('DD/MM/YYYY')),
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
      console.log('data',data);
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
        acquiring: new FormControl(''),
        amount: new FormControl(''),
      }))
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
      formData['propertyList'] = this.identification.value.secondProperty;
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
    if(this.is3propertysatisfy== false&& this.is200propertysatisfy==false)
    {
      self.exchangeService._saveOrUpdateIdForm(formData, self.identificationState).subscribe((response: any) => {
        console.log("response ", response);
        self.identificationState = 'edit';
       //self.getReplacement();
       
        console.log("identification ", self.identification);
  
      }, err => {
        console.log("err ", err);
  
      })
    
    }
    else
    {
      if(this.is200propertysatisfy==true)
      {
this.toastr.error("Amount doesnot satisfy 200% rule")
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
        this.ruleFromToggle = !this.ruleFromToggle;
        this.getExchangeById();
      this.getReplacement();
      this.getDropdownList();
        // this.toastr.success('Exchange created successfully');
        // this.route.navigate(['exchange/approval/list']);
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
    this.EmployeeService._get_exchangedocs(+this.PropertyId).subscribe((data: any)=> {      
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, () => {

    })
  }
  DownloadexchangedocsReplacement(propertyid:number) {
    debugger;
    this.EmployeeService._get_exchangedocs(propertyid).subscribe((data: any)=> {      
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

  updateRelinquish() {
    debugger;
    var self = this;
    console.log("self.exchange ", self.exchange.relinquished);
    let dateofbirth = this.datePipe.transform(new Date(self.exchange.relinquished.relPropertyClosedate), 'MM-DD-YYYY');
    let jsonObj = {
      "exchangeId":self.exchange.relinquished.exchangeId,
      "userId":this.userDetails['userId'] ,
      "date": new Date(),
      "interestPayable": self.exchange.relinquished.interestPayable,
       "relPropertyClosedate": new Date(self.exchange.relinquished.relPropertyClosedate),
    "customFields": [
    {
      "customFieldId": 0,
      "labelName": "string",
      "valueType": "string",
      "value": "string",
      "required": true,
      "toolTip": "string",
      "helpText": "string"
    }
  ]
      //userDetails['userId'],
  }
  
  this.ExchangeService.postApiCall("/api/V1/Exchange/UpdateRelinqueshed", jsonObj).subscribe(success => {
    debugger;
    this.toastr.success('updated successfully');
    //this.route.navigate(['exchange/approval/list']);
}, error => {

})
  }

  closeOutPacket() {
    debugger;
    var self = this;
    console.log("self.exchange.exchangeCloseOutModel ", self.exchange.exchangeCloseOutModel);
    let jsonObj = {
      
        "exchangeId": this.ExchangeId,
        "directTransfer": self.exchange.exchangeCloseOutModel.directTransfer,
        "exchangeFeeReceived": self.exchange.exchangeCloseOutModel.exchangeFeeReceived,
        "identified": self.exchange.exchangeCloseOutModel.identified,
        "bankrefferal": self.exchange.exchangeCloseOutModel.bankrefferal,
        "ownershipInterest": self.exchange.exchangeCloseOutModel.ownershipInterest,
        "salesPrice": self.exchange.exchangeCloseOutModel.salesPrice,
        "accountbalance":"1000",
        "mortgageBoot": self.exchange.exchangeCloseOutModel.mortgageBoot,
        "caTransaction": self.exchange.exchangeCloseOutModel.caTransaction,
        "exemptFromWithholding": self.exchange.exchangeCloseOutModel.exemptFromWithholding,
        "failedExchange": self.exchange.exchangeCloseOutModel.failedExchange,
        "withholdingAmount":self.exchange.exchangeCloseOutModel.withholdingAmount,
        "wireFee": self.exchange.exchangeCloseOutModel.wireFee,
        "amountBeingReleasedtoClient": self.exchange.exchangeCloseOutModel.amountBeingReleasedtoClient,
        "isCloseOut": true,
        "updatedBy":this.userDetails['userId'] ,
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

  ApplyTemplatedropdownList() {
    debugger;
    var self = this;
    self.exchangeService._ApplyTemplateDropdown(1,this.userDetails['userId']).subscribe((data: any) => {
    console.log(data)
    debugger;
    this.ApplyTemplateList = data['userData'];
    })
    }


    closeout() {
      debugger;
      let jsonObj = {

          "exchangeId": this.ExchangeId,
          "updatedBy": this.userDetails['userId'],
          "updatedOn": new Date(),
          "isCloseOut": 1
        }
        
        this.ExchangeService.postApiCall("/api/V1/Exchange/CustomerOrSynergyCloseOutExchange", jsonObj).subscribe(success => {
        debugger;
        this.toastr.success('Exchange closed out successfully', "");
     
      }, error => {
      
      })
      }


    ApplytemplateDownload(){
      debugger;
      let ContactId = 1;
      let ExchangeId = 1;
      let TemplateId = 8;
      var self = this;
      self.exchangeService._DownloadApplyTemplate(TemplateId,ContactId,ExchangeId).subscribe((data: any) => {
        console.log(data)
        debugger;
        this.ApplyTemplateList.Documentname ="IDForm.docx";
        this.ApplyTemplateList = data.userData;
        const a: any = document.createElement('a');
            a.style = 'display: none';
            document.body.appendChild(a);
            const url =this.ApplyTemplateList;
            a.href = url;
            a.download = "IDForm.docx";
            a.click();
        })

    }
    DownloadIDform() {
      debugger;
      this.EmployeeService._get_IDforms(this.ExchangeId).subscribe((data: any)=> {      
        this.ApplyTemplateList = data.userData;
        const a: any = document.createElement('a');
            a.style = 'display: none';
            document.body.appendChild(a);
            const url =this.ApplyTemplateList;
            a.href = url;
            a.download = "Template.docx";
            a.click();
        }, () => {
    
        })
      }
      GenerateExchangeDocumentReplacement(propertyid:number) {
        debugger;
        this.EmployeeService._get_ExchangeDocument(propertyid).subscribe((data: any)=> {   
          debugger;   
          this.ApplyTemplateList = data.resPath;
          const a: any = document.createElement('a');
              a.style = 'display: none';
              document.body.appendChild(a);
              const url =this.ApplyTemplateList;
              a.href = url;
              a.download = "Template.pdf";
              a.click();
          }, () => {
      
          })
        }
      GenerateExchangeDocument() {
        debugger;
        this.EmployeeService._get_ExchangeDocument(+this.PropertyId).subscribe((data: any)=> {      
          this.ApplyTemplateList = data.resPath;
          const a: any = document.createElement('a');
              a.style = 'display: none';
              document.body.appendChild(a);
              const url =this.ApplyTemplateList;
              a.href = url;
              a.download = "Template.docx";
              a.click();
          }, () => {
      
          })
        }
  selectednotetab(value:string)
  {
  this.noteTab=value;
  }

  getNotes() {
    debugger;
    this.EmployeeService._get_Notes(+this.ExchangeId,this.userDetails['userId']).subscribe((data: any) => {
      this.NotesInternal = data.userData.internalList;
      this.NotesExternal = data.userData.generalList;
      console.log(data);
    }, () => {

    })
  }
  Addnotes() {
    debugger;
    // let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    let jsonObj = {
      "exchangeId": +this.ExchangeId,
      "userId": this.userDetails['userId'],
      "private":0,
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
    Proofoffund() {
      debugger;
      this.EmployeeService._get_ProofOfFunds(this.ExchangeId).subscribe((data: any)=> { 
        if(data.isreponseSuccess==false)
        {
this.toastr.error("No transaction for this Exchange")
        } 
        else
        {
          this.ApplyTemplateList = data.userData;
          const a: any = document.createElement('a');
              a.style = 'display: none';
              document.body.appendChild(a);
              const url =this.ApplyTemplateList;
              window.open(url);
              a.download = "Template.docx";
              a.click();
        }     
        
        }, () => {
    
        })
      }
      AccStatement() {
        debugger;
        this.EmployeeService._get_Accstatement(this.ExchangeId).subscribe((data: any)=> {   
          if(data.isreponseSuccess==false)
          {
this.toastr.error("No transaction for this Exchange")
          } 
          else{
            this.ApplyTemplateList = data.userData;
            const a: any = document.createElement('a');
                a.style = 'display: none';
                document.body.appendChild(a);
                const url =this.ApplyTemplateList;
               window.open(url);
                a.download = "Template.docx";
                a.click();
          }  
        
          }, () => {
      
          })
        }
        getdocumentslotList(id:number) {
          debugger;
          this.ExchangeService._getdocumentslotlist(id).subscribe((data: any)=> {
            this.Documentslotlist = data.userData;
            //this.DbExchangeList = data.userData;
            console.log(data);
            }, error => {
        
            })
          
        }

        NotifyAdmin() {
          debugger;
          this.date = new Date();
          let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');
          this.ExchangeService._peakapprove(+this.ExchangeId,this.userDetails['userId'],latest_date).subscribe((success:any) => {
            debugger;
            console.log("NotifyAdmin",success)
            // this.toastr.success('Exchange created successfully');
            // this.route.navigate(['exchange/approval/list']);
          }, error => {
      
          })
        }

        deleteSecondProperty(i,data:any){
          //debugger;
      
          var self = this;
          const secondProperty = <FormArray>self.identification.get('secondProperty');
          secondProperty.removeAt(secondProperty.value.findIndex(image => image.id === i))
      console.log("length",secondProperty.length)
      }

      addExchange() {
        debugger;
        let dateofbirth = this.datePipe.transform(new Date(this.Exchanges.ClosingDate), 'yyyy-dd-MM');
        var date = new Date(dateofbirth);
        // let state = parseInt.Exchanges.state
        let jsonObj = {
           
            "userId": +this.Exchanges.contactid,
            "loginUserId": this.userDetails['userId'],
            "officerName": this.SettlementAgent,
            // "companyName": this.Exchanges.EscrowCompany,
            // "officerPhone": this.Exchanges.EscrowPhone.toString(),
            // "officerEmail": this.Exchanges.EscrowOfficerEmail,
            "propertyTitle": this.Exchanges.Propertytitle?this.Exchanges.Propertytitle:"N/A",
            "zipcode":this.Exchanges.zip,
            "state": parseInt(this.Exchanges.state),
            "city": this.Exchanges.city,
            "expectedClosingDate": new Date(this.Exchanges.ClosingDate)?new Date(this.Exchanges.ClosingDate):new Date(),
            "referralSource": this.Exchanges.Referral? this.Exchanges.Referral:"No Refferal",
            "date": new Date(),
            "valueOfProperty": +this.Exchanges.SalesPrice?+this.Exchanges.SalesPrice:0,
            "debitOfProperty": +this.Exchanges.debt?+this.Exchanges.debt:0,
            "propertyAddress": this.Exchanges.RelinquishedAddress,
            "ownershipInterest": "0",
            "note": this.Exchanges.Notes
            //userDetails['userId'],
        }
        // return false;
        console.log(jsonObj,"jsonObj");
        this.ExchangeService.postApiCall("/api/V1/Exchange/AddExchange", jsonObj).subscribe((success:any) => {
            debugger;
            if(success.response=="Property title Exist")
            {
              this.toastr.error('Property Title already exist');
             // this.route.navigate(['exchange/approval/list']);  
            }
            else{
              this.toastr.success('Exchange created successfully');
             // this.route.navigate(['exchange/approval/list']);
            }
           
        }, error => {

        })
    }

    getContactdropdownList() {
      debugger;
      this.contactservice._ContactListDropdownVal().subscribe((data: any) => {
        console.log(data)
        debugger;
        this.ClientContactDropdownList = data['userData'];
        this.ClientContactDropdownListSearch=data['userData'];
        this.SynergyContactDropdownList = data['userData'];
        this.SynergyContactDropdownListSearch=data['userData'];
       // this.Exchanges.contactid=data['contact']['userid'];
        })
    
      
      }

      getStatelist(){
        this.ExchangeService._getStateslist().subscribe((data:any) =>{
          // this.Statedetails = data;
          this.Statedata = data.userData
         
          console.log(this.Statedetails,"this.Statedetails")
          console.log(this.Statedata,"StateData");
        })
      }
  
      statechange(stateId:any){
        console.log(stateId);
        this.ExchangeService.getCityliste(stateId).subscribe((data:any) =>{
          this.Citydetails = data;
          this.Citydata = data.userData
        
          console.log(this.Citydetails,"this.Citydetails")
          console.log(this.Citydata,"Citydata");
        })
      }

      getUserData(modal:any){
  
        
        this.open(modal);
       }

       open(content) {
        this.modalService.open(content,{size: 'xl', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      
   getstatus()
   {
    setTimeout(()=>{                           //<<<---using ()=> syntax
     this.getExchangeById();
     this.getReplacement();
     this.getDropdownList();
     this.getContactdropdownList();
 }, 8000);
   }
}

