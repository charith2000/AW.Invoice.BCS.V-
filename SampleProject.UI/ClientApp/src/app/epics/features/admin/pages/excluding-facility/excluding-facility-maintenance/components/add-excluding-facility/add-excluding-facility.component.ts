import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ExcludingCustomerModel} from "@application/excluding-customer/excluding-customer.model";
import {ExcludingCustomerApi} from "@application/excluding-customer/excluding-customer.api";

@Component({
  selector: 'app-add-excluding-facility',
  templateUrl: './add-excluding-facility.component.html',
  styleUrls: ['./add-excluding-facility.component.css']
})
export class AddExcludingFacilityComponent implements AfterViewInit {

  @ViewChild('valueInput') remarkInput!: ElementRef;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedExcludingType: string },
    public dialogRef: MatDialogRef<AddExcludingFacilityComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }



  ngAfterViewInit(): void {
    this.setupValueInputListener();
  }

  addExcludingRecord = new FormGroup({
    excludingCustomerType: new FormControl({ value: this.formatString(this.data.selectedExcludingType), disabled: true }),
    excludingValue : new FormControl('', [Validators.required, this.valueValidator()]),
    status: new FormControl({value: 'Active',  disabled:true}, [Validators.required] ),
    remark : new FormControl('', [Validators.required, Validators.maxLength(200) ])
  })



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
          return this.validateMaxLength(control, 100);

        case 'CustomerNo':
          return this.validateMaxLength(control, 20)|| this.validateNoSpaces(trimmedValue);

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
      this.addExcludingRecord.controls['excludingValue'].setValue(input.value);
    }
  }

  get isValueInvalid(): boolean {
    const valueControl = this.addExcludingRecord.get('excludingValue');
    return (
      !!valueControl &&
      valueControl.value !== '' &&
      (valueControl.touched || valueControl.dirty) && valueControl.invalid
    );
  }



  openConfirmation(): void{
    this.modal.confirm({
      nzTitle: 'Do you want to add this record ?',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAddExcludingRecord()
    });
  }
  handleCancel(): void{
    if (this.addExcludingRecord.dirty || this.addExcludingRecord.valid ){
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
  onAddExcludingRecord():void{
    let excludingCustomerModel = {
      excludingCustomerType :
        this.data.selectedExcludingType === 'FacilityNo' ? 1
          : this.data.selectedExcludingType === 'CustomerIC' ? 2
            : this.data.selectedExcludingType === 'CustomerName' ? 3 :
              this.data.selectedExcludingType === 'CustomerNo' ? 4 : 5
      ,

      excludingValue : this.addExcludingRecord.get('excludingValue')?.value,
      remark : this.addExcludingRecord.get('remark')?.value
    } as ExcludingCustomerModel
    this.apiBaseService.post<ExcludingCustomerModel>(
      [ExcludingCustomerApi.base],
      excludingCustomerModel,
      true,
      true,
      'Successfully Added !')
      .subscribe();
    this.onCloseModel();
  }
  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }

}
