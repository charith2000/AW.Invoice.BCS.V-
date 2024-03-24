import {Component, Inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {NzButtonSize} from "ng-zorro-antd/button";
import {Observable} from "rxjs";
import {CatalogueType} from "@application/crib-catalogue-record/crib-catalogue.model";
import {CribCatalogueTypeModel} from "@application/crib-catalogue-record/crib-catalogue-type.model";
import {ReportingSegmentFieldModel} from "@application/common-reporting-settings/reporting-segment.model";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";

@Component({
  selector: 'app-update-segment',
  templateUrl: './update-segment.component.html',
  styleUrls: ['./update-segment.component.css']
})
export class UpdateSegmentComponent implements OnInit{

  catalogueTypes?: Observable<CatalogueType[]>;
  @Input() fields: ReportingSegmentFieldModel[] = [];
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        reportingSegmentFieldId: number
        selectedSegmentId: string
        name: string
        options: string
        type: string
        length: number
        description: string
        catalogueType: string
      },
    public dialogRef: MatDialogRef<UpdateSegmentComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  ngOnInit(): void {
    this.catalogueTypes = this.apiBaseService.get<CribCatalogueTypeModel[]>([CribCatalogueApi.CribCatalogueType], false);
  }

  updateSegmentFieldForm = new FormGroup({
    selectedSegmentId: new FormControl({
      value: this.data.selectedSegmentId,
      disabled: true
    }),
    name: new FormControl({value: this.data.name, disabled: true}),
    options: new FormControl({value: this.data.options, disabled: true}),
    type: new FormControl({value: this.data.type, disabled: true}),
    length: new FormControl({value: this.data.length, disabled: true}),
    description: new FormControl({value: this.data.description, disabled: true}),
    catalogueType: new FormControl(this.data.catalogueType, [Validators.required])
  });


  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }


  handleCancel(): void {
    if (this.updateSegmentFieldForm.dirty || this.updateSegmentFieldForm.valid) {
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

  onCloseModel(): void {
    this.dialogRef.close();
  }

  updateSelectedSegmentFieldRecord(): void {

    let fields = {
      reportingSegmentFieldId : this.data.reportingSegmentFieldId,
      catalogueType: this.updateSegmentFieldForm.get('catalogueType')?.value,
    } as ReportingSegmentFieldModel
    this.apiBaseService.put<ReportingSegmentFieldModel>(
      [ReportingMasterDataApi.reportingSettings, ReportingMasterDataApi.update],
      fields,
      true,
      true,
      'Successfully Updated !')
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to update this record ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.updateSelectedSegmentFieldRecord(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  size: NzButtonSize = 'large';
}
