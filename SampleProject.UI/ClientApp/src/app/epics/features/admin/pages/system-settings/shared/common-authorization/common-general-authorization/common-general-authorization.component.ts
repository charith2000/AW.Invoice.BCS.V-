import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {AuthorizedStatus} from "@core/enums/authorized-status";
import {SystemSetting} from "@application/system-settings/system-setting.model";
import {SystemSettingApi} from "@application/system-settings/system-setting.api";
import {NzModalService} from "ng-zorro-antd/modal";
import {timer} from "rxjs";

@Component({
  selector: 'app-common-general-authorization',
  templateUrl: './common-general-authorization.component.html',
  styleUrls: ['./common-general-authorization.component.css']
})
export class CommonGeneralAuthorizationComponent implements OnInit {

  systemSetting: SystemSetting = {} as SystemSetting;
  currentReportingDate: Date | null = null;
  nextReportingDate: Date | null = null;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              private apiBaseService: ApiBaseService
  ) {
  }

  updateCommonSystemSettingForm = new FormGroup({
    dataProviderName: new FormControl('', [Validators.required]),
    dataProviderId: new FormControl('', [Validators.required]),
    dataProviderBranchId: new FormControl('', [Validators.required]),
    guarantorInformationFrom: new FormControl('', [Validators.required]),
    suiteInformationFrom: new FormControl('', [Validators.required]),
    errorLogFilePath: new FormControl('', [Validators.required])
  });

  onOpenConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to authorize this record ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAuthorize(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<SystemSetting>([SystemSettingApi.CribSystemSetting, SystemSettingApi.authorize], true, true, true,'Successfully Authorized !')
      .subscribe(() => {
        this.getSystemSetting();
        timer(2000).subscribe(() => {
          location.reload();
        });
      } );

  }

  ngOnInit(): void {
    this.getSystemSetting()
  }

  getSystemSetting() : void {
    this.apiBaseService.get<SystemSetting>([SystemSettingApi.CribSystemSetting],false)
      .subscribe((result) => {
        if (result.authorizedStatus == AuthorizedStatus.Pending) {
          this.systemSetting = result
          this.updateCommonSystemSettingForm.patchValue(this.systemSetting);
          this.currentReportingDate = result?.currentReportingDate ?? null;
          this.nextReportingDate = result?.nextReportingDate ?? null;
        }
      })
  }

}
