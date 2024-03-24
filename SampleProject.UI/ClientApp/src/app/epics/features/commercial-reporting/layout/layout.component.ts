import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {MenuItem} from "@core/models/menu-item";
import {
  ReportingSessionDetail,
  ReportingSessionModel,
  SessionDetailStatus
} from "@application/reporting-session/reporting-session.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiBaseService} from "@core/services/api-base.service";
import {StoreReportingDateService} from "@core/services/store-reporting-date.service";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  breadcrumbs: MenuItem[] = [];
  reportingDate: Date | null = null;
  nextReportingDate: Date | null = null;
  reportingSessionDetail: ReportingSessionDetail = {} as ReportingSessionDetail;
  protected readonly SessionDetailStatus = SessionDetailStatus;


  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiBaseService: ApiBaseService,
    private storeReportingDateService: StoreReportingDateService
  ) {
    super();

    //this.onGetSessionAndNavigate();
  }

  ngOnInit(): void {

    this.subscription$.add(
      this.router.events.subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      }));
    this.apiBaseService.get<ReportingSessionModel>([ReportingSessionApi.base])
      .subscribe((res) => {
        this.reportingDate = res?.toDate ?? null
        this.nextReportingDate = res?.fromDate ?? null
      })
    this.onGetSessionAndNavigate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reportingDate || changes.nextReportingDate ) {
      // this.storeReportingDateService.setReportingDates(this.reportingDate, this.nextReportingDate)
    }
  }
  onGetSessionAndNavigate(): void {

    this.apiBaseService.get<ReportingSessionDetail>([ReportingSessionApi.base, 'CM'], false)
      .subscribe((ret) => {
        localStorage.setItem('COMMERCIAL_SESSION_DETAIL', JSON.stringify(ret))
        this.reportingSessionDetail = ret;
        // this.handleNavigation(ret.status);
      })
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  showNavigationMessage(sessionStatus: SessionDetailStatus) {
    if (this.reportingSessionDetail.status != sessionStatus)
      alert("Invalid click");

  }

  handleNavigation(status: SessionDetailStatus): void {
    switch (status) {
      case SessionDetailStatus.download:
        this.router.navigate(['home/consumer/download']).then()
        break;
      case SessionDetailStatus.confirmDownload:
        this.router.navigate(['home/consumer/consumer-map-and-verification']).then()
        break;
    }
  }

  onNavigate(sessionStatus: SessionDetailStatus) {
    this.showNavigationMessage(sessionStatus);
    this.handleNavigation(this.reportingSessionDetail.status)
  }

  // @ts-ignore
  private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[LayoutComponent.ROUTE_DATA_BREADCRUMB];
      if (label != null || label != undefined) {
        breadcrumbs.push({label, url});
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }




}
