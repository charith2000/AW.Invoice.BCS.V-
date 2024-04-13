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
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {


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
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  updateProductForm = new FormGroup({
    productBarcode:  new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(50)]),
    productName:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
    productType:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
    productColor: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productSize: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productDescription: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productUnitPrice: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productStatus: new FormControl({value: 'Active' , disabled: false}, [Validators.required]),
  });

  handleCancel(): void{
    if (this.updateProductForm.dirty || !this.updateProductForm.valid ){
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
     /* catalogueRecordId: this.data.catalogueRecordId,
      catalogueType: this.data.selectedCatalogue,
      cribId: this.updateCatalogForm.get('cribId')?.value,
      bankId: this.updateCatalogForm.get('bankId')?.value,
      description: this.updateCatalogForm.get('description')?.value,
      status: +(this.updateCatalogForm.get('status')?.value ?? 1)*/
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
      nzTitle: 'Do you want to update this product ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.updateSelectedCatalogueTypeRecord(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  size: NzButtonSize = 'large';

}
