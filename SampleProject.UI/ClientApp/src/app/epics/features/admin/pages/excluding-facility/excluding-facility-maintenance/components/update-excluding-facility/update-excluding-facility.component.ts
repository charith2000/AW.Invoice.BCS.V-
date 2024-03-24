import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExcludingCustomerModel} from "@application/excluding-customer/excluding-customer.model";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {ExcludingCustomerApi} from "@application/excluding-customer/excluding-customer.api";

@Component({
  selector: 'app-update-segment-excluding-facility',
  templateUrl: './update-excluding-facility.component.html',
  styleUrls: ['./update-excluding-facility.component.css']
})
export class UpdateExcludingFacilityComponent implements AfterViewInit, OnInit{
  @ViewChild('valueInput') remarkInput!: ElementRef;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedExcludingType: string
      excludingValue: string
      status: number
      authorizedStatus: number
      remark: string
      excludingCustomerTypeId: number
    },
    public dialogRef: MatDialogRef<UpdateExcludingFacilityComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  ngAfterViewInit(): void {
    this.setupValueInputListener();

  }

  editExcludingRecord = new FormGroup({
    excludingCustomerType : new FormControl(this.formatString(this.data.selectedExcludingType), [Validators.required]),
    excludingValue : new FormControl(this.data.excludingValue, [Validators.required,  this.valueValidator()]),
    status: new FormControl(this.data.status.toString(), [Validators.required]),
    authorizedStatus: new FormControl(this.data.authorizedStatus== 1 ? 'Authorized' : 'Pending' , [Validators.required]),
    remark : new FormControl(this.data.remark, [Validators.required, Validators.maxLength(200)])
  })

  openConfirmation(): void{
    this.modal.confirm({
      nzTitle: 'Do you want to edit this record ?',
      nzContent: '<b></b>',
      nzOnOk: () => this.onUpdateExcludingRecord()
    });
  }
  handleCancel(): void{
    if (this.editExcludingRecord.dirty || this.editExcludingRecord.valid ){
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
  onUpdateExcludingRecord():void{
    let excludingCustomerModel = {
      excludingCustomerTypeId : +(this.data.excludingCustomerTypeId),
      excludingCustomerType :
        this.data.selectedExcludingType === 'FacilityNo' ? 1
          : this.data.selectedExcludingType === 'CustomerIC' ? 2
            : this.data.selectedExcludingType === 'CustomerName' ? 3 :
              this.data.selectedExcludingType === 'CustomerNo' ? 4 : 5
      ,
      excludingValue : this.editExcludingRecord.get('excludingValue')?.value,
      status: +(this.editExcludingRecord.get('status')?.value ?? 1),
      remark : this.editExcludingRecord.get('remark')?.value
    } as ExcludingCustomerModel
    this.apiBaseService.put<ExcludingCustomerModel>(
      [ExcludingCustomerApi.base],
      excludingCustomerModel,
      true,
      true,
      'Successfully Updated !')
      .subscribe();
    this.onCloseModel();

  }
  valueValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const excludingCustomerType = this.data.selectedExcludingType;
      const trimmedValue = control.value.trim();

      switch (excludingCustomerType) {
        case 'FacilityNo':
          return this.validateMaxLength(control, 25) || this.validateNoSpaces(trimmedValue);

        case 'CustomerIC':
          return this.validateMaxLength(control, 11) || this.validateNoSpaces(trimmedValue);

        case 'CustomerName':
          return this.validateMaxLength(control, 100) ;

        case 'CustomerNo':
          return this.validateMaxLength(control, 20) || this.validateNoSpaces(trimmedValue);

        default:
          break;
      }

      return null;
    };
  }

  validateMaxLength(control: FormControl, maxLength: number): { [key: string]: any } | null {
    return control.value.length > maxLength ? { maxLengthExceeded: true } : null;
  }
  validateNoSpaces(value: string): { [key: string]: any } | null {
    if (value.length === 0 || value.indexOf(' ') !== -1) {
      return { noSpacesAllowed: true };
    }

    return null;
  }


  setupValueInputListener() {
    this.remarkInput.nativeElement.addEventListener('input', (event: Event) => {
      const input = event.target as HTMLInputElement;
      const excludingCustomerType = this.data.selectedExcludingType;

      switch (excludingCustomerType) {
        case 'FacilityNo':
          this.limitInputLength(input, 25);
          break;

        case 'CustomerIC':
          this.limitInputLength(input, 11);
          break;

        case 'CustomerName':
          this.limitInputLength(input, 100);
          break;

        case 'CustomerNo':
          this.limitInputLength(input, 20);
          break;

        default:
          break;
      }
    });
  }

  limitInputLength(input: HTMLInputElement, maxLength: number) {
    const currentValue = input.value;
    if (currentValue.length > maxLength) {
      input.value = currentValue.slice(0, maxLength);
      this.editExcludingRecord.controls['excludingValue'].setValue(input.value);
    }
  }

  get isValueInvalid(): boolean {
    const valueControl = this.editExcludingRecord.get('excludingValue');
    return (
      !!valueControl &&
      valueControl.value !== '' &&
      (valueControl.touched || valueControl.dirty) && valueControl.invalid
    );
  }

  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }

  ngOnInit(): void {
    this.editExcludingRecord = new FormGroup({
      excludingCustomerType: new FormControl({ value: this.formatString(this.data.selectedExcludingType), disabled: true }, [Validators.required]),
      excludingValue: new FormControl({ value: this.data.excludingValue, disabled: true }, [Validators.required, this.valueValidator()]),
      status: new FormControl({ value: this.data.status.toString(), disabled: true }, [Validators.required]),
      authorizedStatus: new FormControl(this.data.authorizedStatus === 1 ? 'Authorized' : 'Pending', [Validators.required]),
      remark: new FormControl({ value: this.data.remark, disabled: true }, [Validators.required, Validators.maxLength(200)])
    });
    this.setFormControlsBasedOnAuthorizationStatus();
  }

  private setFormControlsBasedOnAuthorizationStatus(): void {
    const authorizedStatus = this.editExcludingRecord.get('authorizedStatus')?.value;

    if (authorizedStatus === 'Pending') {
      this.editExcludingRecord.get('excludingCustomerType')?.disable();
      this.editExcludingRecord.get('excludingValue')?.enable();
      this.editExcludingRecord.get('status')?.disable();
      this.editExcludingRecord.get('authorizedStatus')?.disable();
      this.editExcludingRecord.get('remark')?.enable();
    } else if (authorizedStatus === 'Authorized') {
      this.editExcludingRecord.get('excludingCustomerType')?.disable();
      this.editExcludingRecord.get('excludingValue')?.disable();
      this.editExcludingRecord.get('status')?.enable();
      this.editExcludingRecord.get('authorizedStatus')?.disable();
      this.editExcludingRecord.get('remark')?.enable();
    }
  }
}
