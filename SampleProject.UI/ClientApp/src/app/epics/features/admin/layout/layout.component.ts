import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from "@core/models/menu-item";
import {BaseComponent} from "@core/components/base/base.component";
import {ReportingSessionModel} from "@application/reporting-session/reporting-session.model";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";
import {ApiBaseService} from "@core/services/api-base.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit, OnDestroy {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  breadcrumbs: MenuItem[] = [];
  reportingDate: Date | null = null;
  today= new Date();
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
    sub5: false,
    sub6: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiBaseService: ApiBaseService) {
    super();
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
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

  ngOnInit(): void {
    this.subscription$.add(
      this.router.events.subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      }));

  }
}
