import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzButtonSize} from "ng-zorro-antd/button";
import {ErrorCode} from "@application/crib-error-code/crib-error-code.model";
import {CribErrorCodeApi} from "@application/crib-error-code/crib-error-code.api";


@Component({
  selector: 'app-crib-error-code-edit',
  templateUrl: './crib-error-code-edit.component.html',
  styleUrls: ['./crib-error-code-edit.component.css']
})
export class CribErrorCodeEditComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        id: string,
        prefix: string,
        suffix: string,
        message: string,
        gravityCode: string,
        status: number
      },
    public dialogRef: MatDialogRef<CribErrorCodeEditComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) { }
  ngOnInit(): void {

  }
  updateErrorCodeForm = new FormGroup({
    prefix: new FormControl({value: this.data.prefix, disabled: true}, [Validators.required]),
    suffix: new FormControl({value: this.data.suffix, disabled: true},[Validators.required]),
    id: new FormControl({value: this.data.id, disabled: true}, [Validators.required]),
    message: new FormControl(this.data.message, [Validators.required,  Validators.maxLength(1000)]),
    gravityCode: new FormControl(this.data.gravityCode, [Validators.required]),
    status: new FormControl(this.data.status.toString(), [Validators.required])
  });

  validate(): boolean {

    if (
      this.updateErrorCodeForm.get('prefix')!.value !== '' &&
      this.updateErrorCodeForm.get('suffix')!.value !== '' &&
      this.updateErrorCodeForm.get('id')!.value !== '' &&
      this.updateErrorCodeForm.get('message')!.value !== '' &&
      this.updateErrorCodeForm.get('gravityCode')!.value !== '' &&
      this.updateErrorCodeForm.get('status')!.value !== null
    ) {

      return true;
    }
    //}
    return false;
  }

  handleCancel(): void{
    if (this.updateErrorCodeForm.dirty || this.updateErrorCodeForm.valid ){
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

  saveSelectedCatalogueTypeRecord():void{
    let errorCode = {
      id: this.data.id,
      prefix: this.data.prefix,
      suffix: this.data.suffix,
      message: this.updateErrorCodeForm.get('message')!.value !,
      gravityCode: this.updateErrorCodeForm.get('gravityCode')!.value !,
      status: +(this.updateErrorCodeForm.get('status')?.value ?? 1)
    } as ErrorCode

    this.apiBaseService.put<ErrorCode>([CribErrorCodeApi.CribErrorCode], errorCode, true, true, 'Successfully Updated !').subscribe(result=>{
      console.log(result);
    });

    this.onCloseModel();

  }

  openConfirmation():void{
    this.modal.confirm({
      nzTitle: 'Do you want to update-segment this record?',
      nzContent: '<b></b>',
      nzOnOk: () => this.saveSelectedCatalogueTypeRecord()
    });
  }

  size: NzButtonSize = 'large';
}
