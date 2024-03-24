import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NzModalService} from "ng-zorro-antd/modal";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";

@Component({
  selector: 'app-add-catalog-popover',
  templateUrl: './add-catalog-popover.component.html',
  styleUrls: ['./add-catalog-popover.component.css']
})
export class AddCatalogPopoverComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedCatalogue: string },
    public dialogRef: MatDialogRef<AddCatalogPopoverComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  handleCancel(): void{
    if (this.addCatalogForm.dirty || this.addCatalogForm.valid ){
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

  addCatalogForm = new FormGroup({
    catalogueType: new FormControl({value: this.formatString(this.data.selectedCatalogue), disabled: true}, [Validators.required]),
    bankId: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    cribId: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    status: new FormControl({value: 'Active' , disabled: true}, [Validators.required])
  });

  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }

  validate(): boolean {
    if (
      this.addCatalogForm.get('catalogueType')!.value !== '' &&
      this.addCatalogForm.get('description')!.value !== '' &&
      this.addCatalogForm.get('bankId')!.value !== '' &&
      this.addCatalogForm.get('cribId')!.value !== '' &&
      this.addCatalogForm.get('status')!.value !
    ) {

      return true;
    }
    //}
    return false;
  }

  saveSelectedCatalogueTypeRecord(): void {
    let cribCatalogueRecord = {
      catalogueType: this.data.selectedCatalogue,
      cribId: this.addCatalogForm.get('cribId')!.value !,
      bankId: this.addCatalogForm.get('bankId')!.value !,
      description: this.addCatalogForm.get('description')!.value !,
    } as CribCatalogueRecord
    this.apiBaseService.post<CribCatalogueRecord>([CribCatalogueApi.CribCatalogueRecord], cribCatalogueRecord, true, true, 'Successfully Added!').subscribe();
    this.onCloseModel();
  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to add this record ?',
      nzContent: '<b></b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.saveSelectedCatalogueTypeRecord(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  size: NzButtonSize = 'large';
}

