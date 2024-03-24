import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";
import {query} from "@angular/animations";

@Component({
  selector: 'app-execute-ad-hoc-script',
  templateUrl: './execute-ad-hoc-script.component.html',
  styleUrls: ['./execute-ad-hoc-script.component.css']
})
export class ExecuteAdHocScriptComponent{
  isFormDirty: boolean = false;
  query : string = '';
  status : string = '';


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
    extraKeys: {'Ctrl-Space': 'autocomplete'},
    readOnly: true
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
    public dialogRef: MatDialogRef<ExecuteAdHocScriptComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }


  updateAdHocDataForm = new FormGroup({
    dataAmendingArea: new FormControl({value: this.data.dataAmendingArea, disabled: true}, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
    query: new FormControl(decodeURIComponent(this.data.query), [Validators.required]),
    //status: new FormControl({value: this.data.status.toString(), disabled: true}, [Validators.required])
    status: new FormControl({value: this.getStatusText(this.data.status.toString()), disabled: true}, [Validators.required])

  });

  ngOnInit(): void {
    console.log(this.data.status.toString())
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
      nzTitle: 'This query is verified. Do you want to execute query ?',
      nzContent: '<b></b>',
      nzOnOk: () => this.onExecute()
    });
  }


  onExecute(){
    let adHoc = {
      // id: this.data.id,
      // dataAmendingArea: this.updateAdHocDataForm.get('dataAmendingArea')!.value !,
      // description: this.updateAdHocDataForm.get('description')!.value !,
      query: this.updateAdHocDataForm.get('query')?.value !,
      //status: +(this.updateAdHocDataForm.get('status')?.value ?? 1)
    }
    //as AdHoc

    this.apiBaseService.post<AdHoc>([AdHocApi.ExecuteAdHocScript],
      adHoc, true, true, 'Successfully Executed!')
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

  getStatusText(status: string): string {
    const statusValue = status ?? 1 ? 'Active' : 'Inactive';
    //return statusValue === "1" ? "Active" : "Inactive";
    console.log('Status Value:', statusValue);
    this.status == statusValue
    return statusValue;
  }

}
