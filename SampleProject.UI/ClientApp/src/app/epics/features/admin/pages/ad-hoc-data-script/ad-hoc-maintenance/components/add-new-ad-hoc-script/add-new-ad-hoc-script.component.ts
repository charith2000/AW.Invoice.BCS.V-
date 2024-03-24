import {Component, Inject, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";


@Component({
  selector: 'app-add-new-ad-hoc-script',
  templateUrl: './add-new-ad-hoc-script.component.html',
  styleUrls: ['./add-new-ad-hoc-script.component.css']
})
export class AddNewAdHocScriptComponent {

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
    extraKeys: { 'Ctrl-Space': 'autocomplete' }
  };

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedDataAmendingAreaType: string
      adHocId : string
    },
    public dialogRef: MatDialogRef<AddNewAdHocScriptComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService
  ) {
  }


  addAdHocDataForm = new FormGroup({
    dataAmendingArea: new FormControl({value: this.data.selectedDataAmendingAreaType, disabled:true}, [Validators.required]),
    description : new FormControl('',[Validators.required]),
    status: new FormControl({value: 'Active',  disabled:true}, [Validators.required] ),
    query: new FormControl('', [Validators.required])
  });

  form = new FormGroup({
    dataAmendingArea: new FormControl('', [Validators.required]),
    description : new FormControl('',[Validators.required]),
    scriptNumber: new FormControl(''),
    status: new FormControl('',[Validators.required]),
    authStatus: new FormControl('',[Validators.required]),
    query: new FormControl('', [Validators.required])
  })
  handleCancel(): void{
    if (this.addAdHocDataForm.dirty || this.addAdHocDataForm.valid ){
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

  openConfirmation():void{
    this.modal.confirm({
      nzTitle: 'This query is verified. Do you want to add this record',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAddQuery()
    });
  }


  onAddQuery(): void {
    let adHoc = {
      dataAmendingArea: this.addAdHocDataForm.get('dataAmendingArea')!.value !,
      description: this.addAdHocDataForm.get('description')!.value !,
      query: this.addAdHocDataForm.get('query')?.value
    } as AdHoc
    this.apiBaseService.post<AdHoc>([AdHocApi.AdHocScript],
      adHoc, true, true, 'Successfully Added!')
      .subscribe(()=> this.onCloseModel());
  }

  onTestQuery(): void{
    let adHoc = {
      query : this.addAdHocDataForm.get('query')!.value !
    }
    this.apiBaseService.post<AdHoc>([AdHocApi.TestAdHocQuery], adHoc, true, true, 'Query successfully Validated')
      .subscribe(result => {
        this.openConfirmation();
      }, error => {
      });
  }


}
