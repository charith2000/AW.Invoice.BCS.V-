import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportingSystemSettingModel} from "@application/reporting-system-setting/reporting-system-setting.model";

@Component({
  selector: 'app-common-setting-authorization',
  templateUrl: './common-setting-authorization.component.html',
  styleUrls: ['./common-setting-authorization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonSettingAuthorizationComponent implements OnChanges {

  @Input() commonSetting: ReportingSystemSettingModel = {} as ReportingSystemSettingModel;

  authorizeConsumerGeneralForm = new FormGroup({
    natureOfData: new FormControl(this.commonSetting.natureOfData, [Validators.required]),
    iffVersion: new FormControl(this.commonSetting.iffVersion, [Validators.required]),
    comment: new FormControl(this.commonSetting.comment, [Validators.required]),
    dltFilePath: new FormControl(this.commonSetting.dltFilePath, [Validators.required]),
    cribErrorLogPath: new FormControl(this.commonSetting.cribErrorLogPath, [Validators.required]),
  });


  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.commonSetting != undefined && changes.commonSetting.currentValue != null) {
      this.authorizeConsumerGeneralForm.patchValue({
        natureOfData: changes.commonSetting.currentValue.natureOfData,
        iffVersion: changes.commonSetting.currentValue.iffVersion,
        comment: changes.commonSetting.currentValue.comment,
        dltFilePath: changes.commonSetting.currentValue.dltFilePath,
        cribErrorLogPath: changes.commonSetting.currentValue.cribErrorLogPath,
      })
    }
  }


}
