import {Component, HostListener, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {NzButtonSize} from "ng-zorro-antd/button";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedCatalogue: string },
    public dialogRef: MatDialogRef<AddProductComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const productBarcodeControl = this.addProductForm.get('productBarcode');
    if (productBarcodeControl && document.activeElement !== document.getElementById('productBarcode')) {

      event.preventDefault();
      productBarcodeControl.patchValue(productBarcodeControl.value + event.key);
    }
  }


  handleCancel(): void{
    if (this.addProductForm.dirty || this.addProductForm.valid ){
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

  addProductForm = new FormGroup({
    productBarcode:  new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(50)]),
    productName:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
    productType:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
    productColor: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productSize: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productDescription: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productUnitPrice: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    productStatus: new FormControl({value: 'Active' , disabled: false}, [Validators.required]),
  });


  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }



  saveProduct(): void {
    let cribCatalogueRecord = {
      /* catalogueType: this.data.selectedCatalogue,
       cribId: this.addCatalogForm.get('cribId')!.value !,
       bankId: this.addCatalogForm.get('bankId')!.value !,
       description: this.addCatalogForm.get('description')!.value !,*/
    } as CribCatalogueRecord
    this.apiBaseService.post<CribCatalogueRecord>([CribCatalogueApi.CribCatalogueRecord], cribCatalogueRecord, true, true, 'Successfully Added!').subscribe();
    this.onCloseModel();
  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to add this product ?',
      nzContent: '<b></b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.saveProduct(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  size: NzButtonSize = 'large';
}

