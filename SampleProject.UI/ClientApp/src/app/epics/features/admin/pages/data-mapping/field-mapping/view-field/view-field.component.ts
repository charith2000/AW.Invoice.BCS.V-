import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataMappingModel} from "@application/data-mapping/data-mapping.model";
import {ApiBaseService} from "@core/services/api-base.service";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api";
import {CribCatalogueTypeModel} from "@application/crib-catalogue-record/crib-catalogue-type.model";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {Observable} from "rxjs";
import {CatalogueType} from "@application/crib-catalogue-record/crib-catalogue.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {RowIndexMemoryService} from "@core/services/row-index-memory.service";

@Component({
  selector: 'app-view-field',
  templateUrl: './view-field.component.html',
  styleUrls: ['./view-field.component.css']
})
export class ViewFieldComponent implements OnInit {

  showDefaultValueDiv: boolean = false;
  showConditionDiv: boolean = false;
  // showCatalogueType: boolean = false;
  showDBValueDiv: boolean = false;
  showNADiv: boolean = false;
  catalogueTypes?: Observable<CatalogueType[]>;
  @Input() testConnection = {} as DataMappingModel;
  currentIndex: number = 0;
  currentRecord: any = {};
  isNADisabled = false;

  constructor(
    public dialog: MatDialog,
    private apiBaseService: ApiBaseService,
    public dialogRef: MatDialogRef<ViewFieldComponent>,
    private modal: NzModalService,
    private formBuilder: FormBuilder,
    private rowIndexMemoryService: RowIndexMemoryService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      currentIndex: number
      dialogDataArray: []
    }
  ) {
  }

  ngOnInit(): void {

    this.currentIndex = this.data.currentIndex;
    this.createForm();
    this.setCurrentRecord(this.currentIndex);

    this.viewFieldMappingForm.get('mappingType')!.valueChanges.subscribe((value) => {
      this.showDefaultValueDiv = value === '1';
      this.showDBValueDiv = value === '2';
      this.showNADiv = value === '4';
    });


    const initialMappingType = this.viewFieldMappingForm.get('mappingType')!.value !;
    this.updateFieldVisibility(initialMappingType);

    this.viewFieldMappingForm.get('mappingType')!.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.updateFieldVisibility(value);
      }
    });


    const initialOption = this.viewFieldMappingForm.get('options')!.value !;
    this.manageOptionSelection(initialOption)

    this.viewFieldMappingForm.get('options')!.valueChanges.subscribe((value) => {
        if (value !== null ){
          this.manageOptionSelection(value)
        }
    });

    this.catalogueTypes = this.apiBaseService.get<CribCatalogueTypeModel[]>([CribCatalogueApi.CribCatalogueType], false);

    // this.enableCatalogueForm.get('isCheckedCatalogue')!.valueChanges.subscribe((value) => {
    //   this.showCatalogueType = !!value
    //
    // })
  }



  viewFieldMappingForm = new FormGroup({
    dataSourceTableConnectionFieldMappingId: new FormControl(''),
    segment: new FormControl({value: '', disabled: true}, [Validators.required]),
    field: new FormControl({value: '', disabled: true}, [Validators.required]),
    options: new FormControl({value: '', disabled: true}, [Validators.required]),
    mappingType: new FormControl('', [Validators.required]),
  })

  viewDbValueForm = new FormGroup({
    fieldMapping: new FormControl('', [Validators.required])
  })
  viewDefaultValueForm = new FormGroup({
    defaultValue: new FormControl('', [Validators.required])
  })

  // enableCatalogueForm = new FormGroup({})

  createForm() {
    this.viewFieldMappingForm = this.formBuilder.group({
      dataSourceTableConnectionFieldMappingId: new FormControl(''),
      segment: new FormControl({value: '', disabled: true},),
      field: new FormControl({value: '', disabled: true}),
      options: new FormControl({value: '', disabled: true}),
      mappingType: new FormControl('')
    });
  }

  showNextRecord() {
    if (this.currentIndex < this.data.dialogDataArray.length - 1) {
      this.currentIndex++;
      this.setCurrentRecord(this.currentIndex);
      this.rowIndexMemoryService.updateSelectedIndex(this.currentIndex);
    }
  }

  showPreviousRecord(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.setCurrentRecord(this.currentIndex);
      this.rowIndexMemoryService.updateSelectedIndex(this.currentIndex);
    }
  }

  setCurrentRecord(index: number) {
    this.currentRecord = this.data.dialogDataArray[index];
    this.viewFieldMappingForm?.patchValue({
      dataSourceTableConnectionFieldMappingId: this.currentRecord.dataSourceTableConnectionFieldMappingId,
      segment: this.currentRecord.reportingSegmentField.reportingSegmentId,
      field: this.currentRecord.reportingSegmentField.name,
      options: this.currentRecord.reportingSegmentField.options,
      mappingType: this.currentRecord.mappingType.toString()
    });
    this.viewDbValueForm?.patchValue({
      fieldMapping: this.currentRecord.fieldMapping
    });
    this.viewDefaultValueForm?.patchValue({
      defaultValue: this.currentRecord.defaultValue
    });
  }

  private updateFieldVisibility(mappingType: string): void {
    this.showDefaultValueDiv = mappingType === '1';
    this.showDBValueDiv = mappingType === '3';
    this.showConditionDiv = mappingType === '2';
    this.showNADiv = mappingType === '4';
  }

  private manageOptionSelection(options: string): void {
    this.isNADisabled = options == "Required" || options == "Required Conditionally";
  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to update this record ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onUpdate(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  onUpdate(): void {
    let dataMappingModel = {};
    if (this.viewFieldMappingForm.get('mappingType')!.value == '1') {
      dataMappingModel = {
        dataSourceTableConnectionFieldMappingId: +(this.viewFieldMappingForm.get('dataSourceTableConnectionFieldMappingId')?.value !),
        mappingType: +(this.viewFieldMappingForm.get('mappingType')?.value !),
        defaultValue: this.viewDefaultValueForm.get('defaultValue')?.value !,
        // catalogueType: this.viewCatalogueForm.get('catalogueType')?.value !,
        fieldMapping: undefined,
        condition: undefined,
      }
    }
    if (this.viewFieldMappingForm.get('mappingType')!.value == '3') {
      dataMappingModel = {
        dataSourceTableConnectionFieldMappingId: +(this.viewFieldMappingForm.get('dataSourceTableConnectionFieldMappingId')?.value !),
        mappingType: +(this.viewFieldMappingForm.get('mappingType')?.value !),
        fieldMapping: this.viewDbValueForm.get('fieldMapping')?.value !,
        // catalogueType: this.viewCatalogueForm.get('catalogueType')?.value !,
        defaultValue: undefined,
        condition: undefined
      }
    }
    if (this.viewFieldMappingForm.get('mappingType')!.value == '4') {
      dataMappingModel = {
        dataSourceTableConnectionFieldMappingId: +(this.viewFieldMappingForm.get('dataSourceTableConnectionFieldMappingId')?.value !),
        mappingType: +(this.viewFieldMappingForm.get('mappingType')?.value !),
        // catalogueType: this.viewCatalogueForm.get('catalogueType')?.value !,
        fieldMapping: undefined,
        defaultValue: undefined,
        condition: undefined
      }
    }

    this.apiBaseService.put<DataMappingModel>([TableConnectionApi.base, TableConnectionApi.field],
      dataMappingModel,
      true,
      true,
      'Successfully Updated !').subscribe(() => {

       this.dialogRef.close(dataMappingModel);
    });
  }

  onCloseModel(): void {
    this.dialogRef.close();
  }

  handleCancel(): void {
    if (
      (this.viewFieldMappingForm.dirty) ||
      (this.viewDefaultValueForm.dirty) ||
      (this.viewDbValueForm.dirty)
    ) {
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


  options = {
    mode: 'text/x-mysql',
    lineNumbers: true,
    theme: 'ssms',
    showHint: true,
    indentWithTabs: true,
    smartIndent: true,
    autofocus: true,
    lint: {
      onUpdateLinting: this.handleErrors
    },
    extraKeys: {'Ctrl-Space': 'autocomplete'}
  };

  private handleErrors() {
    console.log('handleErrors');
  }
}
