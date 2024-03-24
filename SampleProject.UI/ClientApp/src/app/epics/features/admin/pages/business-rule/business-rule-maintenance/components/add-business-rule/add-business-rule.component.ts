import {
  Component,
  Inject,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";
import {ReportingSegmentModel} from "@application/common-reporting-settings/reporting-segment.model";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";
import {Observable} from "rxjs";
import {BusinessRuleMaxSequence} from "@application/business-rule/business-rule-max-sequence.model";
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-business-rule',
  templateUrl: './add-business-rule.component.html',
  styleUrls: ['./add-business-rule.component.css']
})
export class AddBusinessRuleComponent implements OnInit{

  query : string = '';
  returnQuery : string = '';
  rulesList: FormGroup[] = [];
  reportingSegments?: Observable<ReportingSegmentModel[]>;
  maxSequence: string = '';


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
      selectedRule: string
      businessRuleId : string
    },
    public dialogRef: MatDialogRef<AddBusinessRuleComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
    private formBuilder: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.getBusinessRulesListBySelected()
    this.reportingSegments = this.apiBaseService.get<ReportingSegmentModel[]>
    ([ReportingMasterDataApi.reportingSettings, this.data.selectedRule, ReportingMasterDataApi.segments]);

    this.addBusinessRuleForm.get('reportingSegmentId')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((reportingSegmentId: string | null) => {
        if (reportingSegmentId !== null) {
          this.getMaxSequence(reportingSegmentId);
        }
      });

    this.addBusinessRuleForm.get('ruleExecutionPoint')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((ruleExecutionPoint: string | null) => {
        if (ruleExecutionPoint !== null) {
          this.getMaxSequence(ruleExecutionPoint);
        }
      });
  }


  addBusinessRuleForm = new FormGroup({

    reportingId: new FormControl({value:this.data.selectedRule, disabled:true},[Validators.required]),
    reportingSegmentId: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
    ruleExecutionPoint: new FormControl('',[Validators.required]),
    sequence: new FormControl('',[Validators.required, Validators.maxLength(5)]),
    query: new FormControl(this.query,[Validators.required]),
    status: new FormControl({value: 'Active', disabled: true},[Validators.required])
  });

  handleCancel(): void{
    if (this.addBusinessRuleForm.dirty || this.addBusinessRuleForm.valid ){
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

   getBusinessRulesListBySelected() {
     this.apiBaseService.get<BusinessRule[]>([`${BusinessRuleApi.BusinessRule}?$filter=reportingId eq '${this.data.selectedRule}'`],false)
       .subscribe((data : any[]) => {
         data.forEach(item => {
           const form = this.formBuilder.group({
             segmentName: item.segmentName,
             sequence: item.sequence,
             status: item.status,
             ruleExecutionPoint: item.ruleExecutionPoint,
             query: item.query
           });
           this.rulesList.push(form)
         });
       });
  }


  onAddQuery(): void {
    //this.combineTestQuery();
    let businessRule = {
      reportingId: this.addBusinessRuleForm.get('reportingId')!.value !,
      reportingSegmentId: this.addBusinessRuleForm.get('reportingSegmentId')!.value !,
      description: this.addBusinessRuleForm.get('description')!.value !,
      ruleExecutionPoint: +(this.addBusinessRuleForm.get('ruleExecutionPoint')?.value ?? 1),
      sequence: +(this.addBusinessRuleForm.get('sequence')?.value ?? 1),
      query: this.addBusinessRuleForm.get('query')?.value
    } as BusinessRule
    this.apiBaseService.post<BusinessRule>([BusinessRuleApi.BusinessRule], businessRule, true, true, 'Successfully Added!')
      .subscribe(()=> this.onCloseModel());

  }

  onTestQuery(): void{
    let businessRule = {
      query : this.addBusinessRuleForm.get('query')!.value !
    }
    this.apiBaseService.post<BusinessRule>([BusinessRuleApi.TestBusinessRuleQuery], businessRule, true, true, 'Successfully Validated!')
      .subscribe(result => {
        this.openConfirmation();
      }, error => {
      });
  }

  getMaxSequence(param: string): void {

    const reportingSegmentId = this.addBusinessRuleForm.get('reportingSegmentId')?.value;
    const ruleExecutionPoint = this.addBusinessRuleForm.get('ruleExecutionPoint')?.value;

    let params = new HttpParams()

    params = params.append('reportingSegmentId', reportingSegmentId ?? '');
    params = params.append('ruleExecutionPoint', ruleExecutionPoint ?? '');

    this.apiBaseService.get<BusinessRuleMaxSequence>([BusinessRuleApi.MaxSequecne],false,false, params)
      .subscribe(response => {
        this.addBusinessRuleForm.patchValue({sequence: response.value.toString()});

      });
  }

}
