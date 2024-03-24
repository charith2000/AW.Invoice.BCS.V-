import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ReportingSystemSettingModel} from "@application/reporting-system-setting/reporting-system-setting.model";
import {ReportingSystemSettingApi} from "@application/reporting-system-setting/reporting-system-setting.api";


@Component({
  selector: 'app-common-general-settings',
  templateUrl: './common-general-settings.component.html',
  styleUrls: ['./common-general-settings.component.css']
})
export class CommonGeneralSettingsComponent implements OnInit {

  @Input() code: string = ''

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
    private modal: NzModalService
  ) {
  }


  commonSetting!: ReportingSystemSettingModel;

  ngOnInit(): void {
    this.apiBaseService
      .get<ReportingSystemSettingModel>([ReportingSystemSettingApi.base, this.code])
      .subscribe((result) => {
        this.commonSetting = result;
        this.addOrUpdateConsumerGeneralForm.patchValue(this.commonSetting);
      });
  }

  addOrUpdateConsumerGeneralForm = new FormGroup({
    natureOfData: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    iffVersion: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    comment: new FormControl('', [Validators.maxLength(100)]),
    dltFilePath: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    cribErrorLogPath: new FormControl({value: '', disabled: true} , [Validators.required, Validators.maxLength(100)]),
  });

  onUpdateOrSave(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to update-segment settings ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onSubmit(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });

  }

  onSubmit(): void {
    let commonUpdateOrSaveSetting : ReportingSystemSettingModel ={
      reportingSystemSettingId: this.code,
      natureOfData: this.addOrUpdateConsumerGeneralForm.get('natureOfData')?.value ,
      iffVersion: this.addOrUpdateConsumerGeneralForm.get('iffVersion')?.value ,
      comment: this.addOrUpdateConsumerGeneralForm.get('comment')?.value || '',
      dltFilePath: this.addOrUpdateConsumerGeneralForm.get('dltFilePath')?.value ,
      cribErrorLogPath: this.addOrUpdateConsumerGeneralForm.get('cribErrorLogPath')?.value
    } as ReportingSystemSettingModel

    this.apiBaseService.put<ReportingSystemSettingModel>([ReportingSystemSettingApi.base, this.code],commonUpdateOrSaveSetting, true, true, 'Successfully Updated !').subscribe(result=>{
    } );
  }
}
