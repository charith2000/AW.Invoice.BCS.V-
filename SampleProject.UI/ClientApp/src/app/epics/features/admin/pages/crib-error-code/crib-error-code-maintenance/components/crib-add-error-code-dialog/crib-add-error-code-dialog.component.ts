import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzButtonSize} from "ng-zorro-antd/button";

import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ErrorCode} from "@application/crib-error-code/crib-error-code.model";
import {CribErrorCodeApi} from "@application/crib-error-code/crib-error-code.api";

@Component({
  selector: 'app-crib-add-error-code-dialog',
  templateUrl: './crib-add-error-code-dialog.component.html',
  styleUrls: ['./crib-add-error-code-dialog.component.css']
})
export class CribAddErrorCodeDialogComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedCatalogue: string },
    public dialogRef: MatDialogRef<CribAddErrorCodeDialogComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService
    ) { }


  handleCancel(): void{
    if (this.addErrorCodeForm.dirty || this.addErrorCodeForm.valid ){
      this.modal.confirm({
        nzTitle: 'Do you want to leave this window? ',
        nzContent: '<b></b>',
        nzOnOk: () => this.onCloseModel(),
        nzOkText: "Yes",
        nzCancelText: "No"
      });
    } else {
      this.dialogRef.close();
    }
  }
  onCloseModel(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  addErrorCodeForm = new FormGroup({
    prefix: new FormControl('',[Validators.required, Validators.maxLength(3)]),
    suffix: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    errorCode: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required,  Validators.maxLength(1000)]),
    gravityCode: new FormControl('',[Validators.required]),
    status: new FormControl({value: 'Active', disabled: true} ,[Validators.required])
  });

  validate(): boolean {
    // if(this.addCatalogForm.get('catalogueType')!.value === ''){
    if (
      this.addErrorCodeForm.get('prefix')!.value !== '' &&
      this.addErrorCodeForm.get('suffix')!.value !== '' &&
      this.addErrorCodeForm.get('errorCode')!.value !== '' &&
      this.addErrorCodeForm.get('message')!.value !== ''
      //this.addErrorCodeForm.get('gravityCode')!.value !== ''
    ) {

      return true;
    }
    //}
    return false;
  }

  saveSelectedErrorCode():void{
    let errorCode : ErrorCode = {
      prefix: this.addErrorCodeForm.get('prefix')!.value!,
      suffix: this.addErrorCodeForm.get('suffix')!.value!,
      message: this.addErrorCodeForm.get('message')!.value!,
      gravityCode: this.addErrorCodeForm.get('gravityCode')!.value!
      //status: this.addErrorCodeForm.get('status')!.value !,
    } as ErrorCode


    this.apiBaseService.post<ErrorCode>([CribErrorCodeApi.CribErrorCode], errorCode, true, true, 'Successfully Added!').subscribe(result=>{
     console.log(result);
    });

    this.onCloseModel();


  }

  openConfirmation():void{
    this.modal.confirm({
      nzTitle: 'Do you want to add this record',
      nzContent: '<b></b>',
      nzOnOk: () => this.saveSelectedErrorCode()
    });
  }

  updateErrorCode(){
    const prefixControl = this.addErrorCodeForm.get('prefix') as FormControl;
    const suffixControl = this.addErrorCodeForm.get('suffix') as FormControl;
    const errorCodeControl = this.addErrorCodeForm.get('errorCode') as FormControl;

    const prefixValue = prefixControl.value || '';
    const suffixValue = suffixControl.value || '';

    const errorCodeValue = prefixValue + '-'+ suffixValue;
    errorCodeControl.setValue(errorCodeValue);
  }

  size: NzButtonSize = 'large';

  isVisible = false;
  isEditable = false;

}
