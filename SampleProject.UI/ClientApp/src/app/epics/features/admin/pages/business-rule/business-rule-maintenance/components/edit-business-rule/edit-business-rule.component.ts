import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";

@Component({
  selector: 'app-edit-business-rule',
  templateUrl: './edit-business-rule.component.html',
  styleUrls: ['./edit-business-rule.component.css']
})
export class EditBusinessRuleComponent implements OnInit {
  returnQuery : string = ''
  isFormDirty: boolean = false;

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
      selectedRule: string
      reportingSegmentId: string
      segmentName : string
      description: string
      ruleExecutionPoint: number
      sequence: number
      query: string
      status : number
      businessRuleId : number
    },
    public dialogRef: MatDialogRef<EditBusinessRuleComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService
  ) {
  }


  updateBusinessRuleForm = new FormGroup({
    reportingId: new FormControl({value: this.data.selectedRule, disabled: true}, [Validators.required]),
    reportingSegmentId: new FormControl( this.data.reportingSegmentId , [Validators.required]),
    segmentName: new FormControl({value: this.data.segmentName, disabled: true}, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
    ruleExecutionPoint: new FormControl(this.data.ruleExecutionPoint.toString(), [Validators.required]),
    sequence: new FormControl(this.data.sequence, [Validators.required]),
    query: new FormControl(decodeURIComponent(this.data.query), [Validators.required]),
    status: new FormControl(this.data.status.toString(), [Validators.required])
  });

  ngOnInit(): void {
    this.updateBusinessRuleForm.statusChanges.subscribe(() => {
      this.isFormDirty = this.updateBusinessRuleForm.dirty;
    });
  }

  // decodeQuery(inputQuery :string): void{
  //   const encodedQuery = inputQuery.replace(this.returnQuery)
  //   this.returnDecodeQuery = decodeURIComponent(encodedQuery)
  //   return
  // }

  handleCancel(): void{
    if (this.updateBusinessRuleForm.dirty || this.updateBusinessRuleForm.valid ){
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
    let businessRule = {
      businessRuleId : this.data.businessRuleId,
      reportingId: this.updateBusinessRuleForm.get('reportingId')!.value !,
      reportingSegmentId: this.updateBusinessRuleForm.get('reportingSegmentId')!.value,
      description: this.updateBusinessRuleForm.get('description')!.value !,
      ruleExecutionPoint: +(this.updateBusinessRuleForm.get('ruleExecutionPoint')?.value ?? 1),
      sequence: +(this.updateBusinessRuleForm.get('sequence')?.value ?? 1),
      query: this.updateBusinessRuleForm.get('query')?.value,
      status: +(this.updateBusinessRuleForm.get('status')?.value ?? 1)

    } as BusinessRule
    this.apiBaseService.put<BusinessRule>([BusinessRuleApi.BusinessRule],
      businessRule, true, true, 'Successfully Updated!')
      .subscribe(()=> this.onCloseModel());

  }

  onTestQuery(): void{
    let businessRule = {
      query : this.updateBusinessRuleForm.get('query')!.value !
    }
    this.apiBaseService.post<BusinessRule>([BusinessRuleApi.TestBusinessRuleQuery], businessRule, true, true, 'Query successfully Validated')
      .subscribe(result => {
        this.openConfirmation();
      }, error => {
      });
  }

}
