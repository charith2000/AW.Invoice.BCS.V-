import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {AuthModule} from "@core/+auth/auth.module";
import {GuardService} from "@core/services/guard.service";
import {NgZorroModule} from "@core/modules/ng-zorro/ng-zorro.module";
import {NgChartsModule} from "ng2-charts";
import {MatDialogModule} from "@angular/material/dialog";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {MatButtonModule} from "@angular/material/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {UnderConstructonComponent} from "@core/modules/under-constructon/under-constructon.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";





const routes = [{
  path: '',
  canActivate: [GuardService],
  component: LayoutComponent,
  children: [
    {path: 'under-construction', component: UnderConstructonComponent},
  ]
}] as Routes;

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    NzBreadCrumbModule,
    NzMenuModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AuthModule,
    NgZorroModule,
    NgChartsModule,
    MatDialogModule,
    NzStatisticModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpaceModule,
    NzCardModule
  ]
})
export class CommercialReportingModule { }
