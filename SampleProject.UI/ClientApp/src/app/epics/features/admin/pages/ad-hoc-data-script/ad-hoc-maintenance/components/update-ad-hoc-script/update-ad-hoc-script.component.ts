import {Component, Inject, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";

@Component({
  selector: 'app-update-segment-ad-hoc-script',
  templateUrl: './update-ad-hoc-script.component.html',
  styleUrls: ['./update-ad-hoc-script.component.css']
})
export class UpdateAdHocScriptComponent {

  isFormDirty: boolean = false;
  query : string = '';

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

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number
      dataAmendingArea: string
      description: string
      query: string
      status : number
    },
    public dialogRef: MatDialogRef<UpdateAdHocScriptComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService
  ) {
  }


  updateAdHocDataForm = new FormGroup({
    dataAmendingArea: new FormControl({value: this.data.dataAmendingArea, disabled: true}, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
    query: new FormControl(decodeURIComponent(this.data.query), [Validators.required]),
    status: new FormControl(this.data.status.toString(), [Validators.required])
  });

  ngOnInit(): void {
    this.updateAdHocDataForm.statusChanges.subscribe(() => {
      this.isFormDirty = this.updateAdHocDataForm.dirty;
    });
  }

  handleCancel(): void{
    if (this.updateAdHocDataForm.dirty || this.updateAdHocDataForm.valid ){
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

  private handleErrors() {
    console.log('handleErrors');
  }

  openConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'This query is verified. Do you want to update-segment this record',
      nzContent: '<b></b>',
      nzOnOk: () => this.onUpdate()
    });
  }
  // combineTestQuery(): void {
  //   const encodeQuery = this.updateBusinessRuleForm.get('query')?.value !
  //   this.returnQuery = btoa(encodeQuery);
  // }


  onUpdate(){
    //this.combineTestQuery();
    let adHoc = {
      id: this.data.id,
      dataAmendingArea: this.updateAdHocDataForm.get('dataAmendingArea')!.value !,
      description: this.updateAdHocDataForm.get('description')!.value !,
      query: this.updateAdHocDataForm.get('query')?.value !,
      status: +(this.updateAdHocDataForm.get('status')?.value ?? 1)
    } as AdHoc
    this.apiBaseService.put<AdHoc>([AdHocApi.AdHocScript],
      adHoc, true, true, 'Successfully Updated!')
      .subscribe(()=> this.onCloseModel());

  }

  onTestQuery(): void{
    let adHoc = {
      query : this.updateAdHocDataForm.get('query')!.value !
    }
    this.apiBaseService.post<AdHoc>([AdHocApi.TestAdHocQuery], adHoc, true, true, 'Query successfully Validated')
      .subscribe(result => {
        this.openConfirmation();
      }, error => {
      });
  }

}
