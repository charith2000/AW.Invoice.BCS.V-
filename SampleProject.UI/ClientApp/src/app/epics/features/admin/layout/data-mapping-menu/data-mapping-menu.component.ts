import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";
import {DataMappingMenuModel, ReportingSegments} from "@application/common-reporting-settings/data-mapping-menu.model";
import {StoreDataSourcesService} from "@core/services/store-data-sources.service";

@Component({
  selector: 'app-data-mapping-menu',
  templateUrl: './data-mapping-menu.component.html',
  styleUrls: ['./data-mapping-menu.component.css']
})
export class DataMappingMenuComponent implements OnInit{
  navigationItems? : DataMappingMenuModel[];
  activeItem: any | null = null;

  constructor(
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
    private storeDataSourcesService: StoreDataSourcesService
  ) {}

  ngOnInit(): void {
    // this.navigationItems = this.storeDataSourcesService.getDataSource();
    this.getData()
  }

  getData():void{
    this.apiBaseService.get<DataMappingMenuModel[]>
    (
      [ReportingMasterDataApi.reportingSettings, ReportingMasterDataApi.dataMapping]
    ).subscribe((res)=>{
      this.navigationItems = res.filter(x=>x.reportingSegments.some(y=>y.reportingSegmentDataSources.length > 0))
    })
  }

  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
  }

  getReportingSegments(reportingSegments: ReportingSegments[]) {
    return reportingSegments.filter(x => x.reportingSegmentDataSources.length > 0 )
  }

  activateItem(item: any) {
    this.activeItem = item;
  }
}
