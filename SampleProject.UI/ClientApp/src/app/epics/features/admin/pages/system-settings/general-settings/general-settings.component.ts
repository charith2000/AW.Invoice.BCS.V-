import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {SystemSetting} from "@application/system-settings/system-setting.model";
import {SystemSettingApi} from "@application/system-settings/system-setting.api";
import {NzModalService} from "ng-zorro-antd/modal";


@Component({
  selector: 'app-general-settings-authorization',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit{

  // currentReportingDate: Date = new Date();
  // nextReportingDate: Date = new Date();
  isFormSubmitted: boolean = false;
  currentReportingDate: Date | null = null;
  nextReportingDate: Date | null = null;
  isFormDirty: boolean = false;
  //defaultGuarantorInformationFrom = 'MIS';
  //defaultSuiteInformationFrom = 'MIS';

  systemSetting!: SystemSetting;

  updateCommonSystemSettingForm = new FormGroup({
    dataProviderName: new FormControl('', [Validators.required,Validators.maxLength(75)]),
    dataProviderId: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    dataProviderBranchId: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    guarantorInformationFrom: new FormControl('', [Validators.required]),
    suiteInformationFrom: new FormControl('', [Validators.required]),
    errorLogFilePath: new FormControl('', [Validators.required, Validators.maxLength(75)]),
    //currentReportingDate: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
    private modal: NzModalService
  ) {}

  ngOnInit(){
    this.apiBaseService
      .get<SystemSetting>([SystemSettingApi.CribSystemSetting])
      .subscribe((result) => {
        this.systemSetting = result;
        this.updateCommonSystemSettingForm.patchValue(this.systemSetting);
        this.currentReportingDate = result?.currentReportingDate ?? null;
        this.nextReportingDate = result?.nextReportingDate ?? null;
      });

    // this.updateCommonSystemSettingForm.valueChanges.subscribe(() => {
    //   this.isFormDirty = true;
    // });

    this.updateCommonSystemSettingForm.statusChanges.subscribe(() => {
      this.isFormDirty = this.updateCommonSystemSettingForm.dirty;
    });
  }

  onSubmit(): void {
    if (this.updateCommonSystemSettingForm.valid) {

      this.isFormSubmitted = true;

      let systemSetting = {

        dataProviderName: this.updateCommonSystemSettingForm.get('dataProviderName')?.value || '',
        dataProviderId: this.updateCommonSystemSettingForm.get('dataProviderId')?.value || '',
        dataProviderBranchId: this.updateCommonSystemSettingForm.get('dataProviderBranchId')?.value || '',
        guarantorInformationFrom: this.updateCommonSystemSettingForm.get('guarantorInformationFrom')?.value || '',
        suiteInformationFrom: this.updateCommonSystemSettingForm.get('suiteInformationFrom')?.value || '',
        errorLogFilePath: this.updateCommonSystemSettingForm.get('errorLogFilePath')?.value || '',
        currentReportingDate: this.currentReportingDate,
        nextReportingDate: this.nextReportingDate,
      } as SystemSetting

      this.apiBaseService.put<SystemSetting>(
        [SystemSettingApi.CribSystemSetting],
        systemSetting,
        true,
        true,
        'Successfully Updated !'
      ).subscribe(result => {
        console.log('Update Successful:', result);
      }, error => {
        console.error('Update Error:', error);
      });
    }
  }

  openConfirmation():void{
    this.modal.confirm({
      nzTitle: 'Do you want to update-segment system settings',
      nzContent: '<b></b>',
      nzOnOk: () => this.onSubmit()
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
