import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingSystemSettingModel} from "@application/reporting-system-setting/reporting-system-setting.model";
import {ReportingSystemSettingApi} from "@application/reporting-system-setting/reporting-system-setting.api";
import {
  ReportingSegmentDataSourceModel
} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
import {
  ReportingSegmentDataSourceApi
} from "@application/reporting-segment-data-source/reporting-segment-data-source.api";
import {ExcludingCustomerApi} from "@application/excluding-customer/excluding-customer.api";
import {DataMappingMenuModel} from "@application/common-reporting-settings/data-mapping-menu.model";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";
import {StoreDataSourcesService} from "@core/services/store-data-sources.service";


@Component({
  selector: 'app-common-authorization',
  templateUrl: './common-authorization.component.html',
  styleUrls: ['./common-authorization.component.css']
})
export class CommonAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() code: string = '';

  commonSetting: ReportingSystemSettingModel = {} as ReportingSystemSettingModel;
  dataSource: ReportingSegmentDataSourceModel[] = [];
  navigationItems? : DataMappingMenuModel[];

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              private apiBaseService: ApiBaseService,
              private storeDataSourcesService : StoreDataSourcesService
              ) {

    super();


  }

  ngOnInit(): void {
    this.getReportingSystemSettings();
    this.getReportingSegmentDataSource();
  }


  onAuthorize(): void {
    if (this.getAllRowAsArray() != null) {
      this.onReportingSystemSettingAuthorize();
      this.onReportingSegmentDataSourceAuthorize();
    }

  }

  onOpenConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to authorize this records ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAuthorize(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });
  }

  getReportingSystemSettings(): void {
    this.apiBaseService.get<ReportingSystemSettingModel>([ReportingSystemSettingApi.base, this.code],false)
      .subscribe(ret => this.commonSetting = ret)
    this.storeDataSourceName();
  }

  getReportingSegmentDataSource() {
    this.apiBaseService.get<ReportingSegmentDataSourceModel[]>(
      [ReportingSegmentDataSourceApi.unauthorized, this.code],false)
      .subscribe(res => this.dataSource = res);
    this.storeDataSourceName();
  }

  onReportingSystemSettingAuthorize(): void {
    if (this.commonSetting != null) {
      this.apiBaseService
        .post<ReportingSystemSettingModel>(
          [ReportingSystemSettingApi.base, this.code, ReportingSystemSettingApi.authorize],
          true, true, true, 'Successfully Authorized !')
        .subscribe(() => this.getReportingSystemSettings());

    }
  }

  onReportingSegmentDataSourceAuthorize(): void {
    if (this.getAllRowAsArray() != null) {
      this.apiBaseService
        .put<ReportingSegmentDataSourceModel[]>([`${ReportingSegmentDataSourceApi.authorized}?status=1`], Array.from(this.getAllRowAsArray()), true, false, 'Successfully Authorized!')
        .subscribe((result) =>
          this.getReportingSegmentDataSource()
        );

    }
  }


  getAllRowAsArray(): any[] {
    const records: any[] = [];
    const data = this.dataSource || [];

    for (const item of data) {
      records.push(item.reportingSegmentDataSourceId);
    }
    return records;
  }


  storeDataSourceName() : void {
    this.apiBaseService.get<DataMappingMenuModel[]>
    (
      [ReportingMasterDataApi.reportingSettings, ReportingMasterDataApi.dataMapping]
    ).subscribe((res)=>{
      this.navigationItems = res.filter(x=>x.reportingSegments.some(y=>y.reportingSegmentDataSources.length > 0))
      this.storeDataSourcesService.setDataSource(this.navigationItems);
    })
  }
}
