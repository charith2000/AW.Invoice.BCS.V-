import {Component, Inject, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {NzButtonSize} from "ng-zorro-antd/button";

@Component({
  selector: 'app-update-segment-crib-catalogue-dialog',
  templateUrl: './update-crib-catalogue-dialog.component.html',
  styleUrls: ['./update-crib-catalogue-dialog.component.css']
})
export class UpdateCribCatalogueDialogComponent {


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        catalogueRecordId: string,
        selectedCatalogue: string,
        bankId: string,
        cribId: string,
        description: string
        status: number
      },
    public dialogRef: MatDialogRef<UpdateCribCatalogueDialogComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  updateCatalogForm = new FormGroup({
    catalogueType: new FormControl({value: this.formatString(this.data.selectedCatalogue), disabled: true}, [Validators.required]),
    bankId: new FormControl(this.data.bankId, [Validators.required, Validators.maxLength(15)]),
    cribId: new FormControl(this.data.cribId, [Validators.required, Validators.maxLength(5)]),
    description: new FormControl(this.data.description, [Validators.required, Validators.maxLength(50)]),
    status: new FormControl(this.data.status.toString(), [Validators.required])
  });


  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }


  validate(): boolean {

    return this.updateCatalogForm.get(this.data.selectedCatalogue)!.value !== '' &&
      this.updateCatalogForm.get('description')!.value !== '' &&
      this.updateCatalogForm.get('bankId')!.value !== '' &&
      this.updateCatalogForm.get('cribId')!.value !== '' &&
      this.updateCatalogForm.get('status')!.value !== null;
  }

  handleCancel(): void{
    if (this.updateCatalogForm.dirty || !this.updateCatalogForm.valid ){
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

  updateSelectedCatalogueTypeRecord(): void {

    let cribCatalogueRecord = {
      catalogueRecordId: this.data.catalogueRecordId,
      catalogueType: this.data.selectedCatalogue,
      cribId: this.updateCatalogForm.get('cribId')?.value,
      bankId: this.updateCatalogForm.get('bankId')?.value,
      description: this.updateCatalogForm.get('description')?.value,
      status: +(this.updateCatalogForm.get('status')?.value ?? 1)
    } as CribCatalogueRecord
    this.apiBaseService.put<CribCatalogueRecord>(
      [CribCatalogueApi.CribCatalogueRecord],
      cribCatalogueRecord,
      true,
      true,
      'Successfully Updated !')
      .subscribe();
    this.onCloseModel();

  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to update-segment this record ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.updateSelectedCatalogueTypeRecord(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  size: NzButtonSize = 'large';

}
