import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {RouterModule, Routes} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgZorroModule} from "@core/modules/ng-zorro/ng-zorro.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '@angular/cdk/dialog';
import {CodemirrorModule} from "@ctrl/ngx-codemirror";

import {
  CribCatalogueMaintenanceComponent
} from "./pages/crib-catalogue-record/crib-catalogue-maintenace/crib-catalogue-maintenance.component";
import {
  AddCatalogPopoverComponent
} from "./pages/crib-catalogue-record/crib-catalogue-maintenace/components/crib-add-catalog-dialog/add-catalog-popover.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {
  CribErrorCodeMaintenanceComponent
} from './pages/crib-error-code/crib-error-code-maintenance/crib-error-code-maintenance.component';
import {
  CribAddErrorCodeDialogComponent
} from "./pages/crib-error-code/crib-error-code-maintenance/components/crib-add-error-code-dialog/crib-add-error-code-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {
  CribErrorCodeEditComponent
} from './pages/crib-error-code/crib-error-code-maintenance/components/crib-error-code-edit/crib-error-code-edit.component';
import {
  UpdateCribCatalogueDialogComponent
} from "./pages/crib-catalogue-record/crib-catalogue-maintenace/components/update-crib-catalogue-dialog/update-crib-catalogue-dialog.component";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {
  CribErrorCodeAuthorizationComponent
} from './pages/crib-error-code/crib-error-code-authorization/crib-error-code-authorization.component';
import {
  CribCatalogueAuthorizationComponent
} from "./pages/crib-catalogue-record/crib-catalogue-authorization/crib-catalogue-authorization.component";

import {CommercialSettingsComponent} from './pages/system-settings/commercial-settings/commercial-settings.component';
import {ConsumerDcSettingsComponent} from './pages/system-settings/consumer-dc-settings/consumer-dc-settings.component';
import {
  CommercialDcSettingsComponent
} from './pages/system-settings/commercial-dc-settings/commercial-dc-settings.component';
import {GeneralSettingsComponent} from './pages/system-settings/general-settings/general-settings.component';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {MatListModule} from "@angular/material/list";
import {ConsumerSettingsComponent} from './pages/system-settings/consumer-settings/consumer-settings.component';
import {MatTabsModule} from "@angular/material/tabs";
import {
  CommonReportingSettingsViewComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-reporting-settings-view.component';
import {
  CommonSegmentSettingsComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-segment-settings.component';
import {
  CommonGeneralSettingsComponent
} from "./pages/system-settings/shared/common-reporting-settings-view/common-general-settings/common-general-settings.component";
import {
  CommonDataSourceComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-data-source/common-data-source.component';
import {
  CommonSegmentFieldsComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-segment-fields/common-segment-fields.component';
import {
  AddComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-data-source/components/add/add.component';
import {
  UpdateComponent
} from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-data-source/components/update/update.component';
import {
  SystemReportingAuthorizationComponent
} from "./pages/system-settings/authorization/system-reporting-authorization/system-reporting-authorization.component";
import {
  CommonAuthorizationComponent
} from './pages/system-settings/shared/common-authorization/common-authorization.component';
import {
  CommonGeneralAuthorizationComponent
} from './pages/system-settings/shared/common-authorization/common-general-authorization/common-general-authorization.component';
import {
  DataSourceAuthorizationComponent
} from './pages/system-settings/shared/common-authorization/data-source-authorization/data-source-authorization.component';
import {
  CommonSettingAuthorizationComponent
} from './pages/system-settings/shared/common-authorization/common-setting-authorization/common-setting-authorization.component';
import {DataMappingComponent} from "./pages/data-mapping/data-mapping.component";
import {
  BusinessRuleMaintenanceComponent
} from './pages/business-rule/business-rule-maintenance/business-rule-maintenance.component';
import {TestConnectionComponent} from './pages/data-mapping/test-connection/test-connection.component';

import {FieldMappingComponent} from "./pages/data-mapping/field-mapping/field-mapping.component";
import {ViewFieldComponent} from './pages/data-mapping/field-mapping/view-field/view-field.component';
import {DataMappingMenuComponent} from './layout/data-mapping-menu/data-mapping-menu.component';
import {MatChipsModule} from "@angular/material/chips";
import { AddBusinessRuleComponent } from './pages/business-rule/business-rule-maintenance/components/add-business-rule/add-business-rule.component';
import { EditBusinessRuleComponent } from './pages/business-rule/business-rule-maintenance/components/edit-business-rule/edit-business-rule.component';
import { BusinessRuleAuthorizationComponent } from './pages/business-rule/business-rule-authorization/business-rule-authorization.component';
import { DataMappingAuthorizationComponent } from './pages/data-mapping/data-mapping-authorization/data-mapping-authorization.component';
import { TableConnectionComponent } from './pages/data-mapping/data-mapping-authorization/table-connection/table-connection.component';
import {FieldMappingAuthorizationComponent} from "./pages/data-mapping/data-mapping-authorization/field-mapping-authorization/field-mapping-authorization.component";
import { TableConnectionDialogComponent } from './pages/data-mapping/data-mapping-authorization/table-connection/table-connection-dialog/table-connection-dialog.component';
import { FilterConditionDialogComponent } from './pages/data-mapping/data-mapping-authorization/table-connection/filter-condition-dialog/filter-condition-dialog.component';
import { AdHocMaintenanceComponent } from './pages/ad-hoc-data-script/ad-hoc-maintenance/ad-hoc-maintenance.component';
import { AdHocAuthorizationComponent } from './pages/ad-hoc-data-script/ad-hoc-authorization/ad-hoc-authorization.component';
import { AddNewAdHocScriptComponent } from './pages/ad-hoc-data-script/ad-hoc-maintenance/components/add-new-ad-hoc-script/add-new-ad-hoc-script.component';
import { UpdateAdHocScriptComponent } from './pages/ad-hoc-data-script/ad-hoc-maintenance/components/update-ad-hoc-script/update-ad-hoc-script.component';
import { UpdateSegmentComponent } from './pages/system-settings/shared/common-reporting-settings-view/common-segment-settings/common-segment-fields/component/update-segment/update-segment.component';
import { FinalQueryComponent } from './pages/data-mapping/final-query/final-query.component';
import {AuthModule} from "@core/+auth/auth.module";
import {GuardService} from "@core/services/guard.service";
import { UploadErrorLogComponent} from "./pages/fileUpload/upload-error-log/upload-error-log.component";
import { ViewErrorRecordComponent } from './pages/fileUpload/upload-error-log/view-error-record/view-error-record.component';
import { CloseReportingComponent } from './pages/close-reporting/close-reporting.component';
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import { ConfirmAndCloseSessionComponent } from './pages/close-reporting/confirm-and-close-session/confirm-and-close-session.component';
import { DataSourceTableConnectionMaintenanceComponent } from './pages/data-source-connection/data-source-table-connection-maintenance/data-source-table-connection-maintenance.component';
import { DataSourceTableConnectionAuthorizationComponent } from './pages/data-source-connection/data-source-table-connection-authorization/data-source-table-connection-authorization.component';
import { DataSourceTableConnectionAddComponent } from './pages/data-source-connection/data-source-table-connection-maintenance/data-source-table-connection-add/data-source-table-connection-add.component';
import { DataSourceTableConnectionUpdateComponent } from './pages/data-source-connection/data-source-table-connection-maintenance/data-source-table-connection-update/data-source-table-connection-update.component';
import { AdHocExecutionComponent } from './pages/ad-hoc-data-script/ad-hoc-execution/ad-hoc-execution.component';
import { ExecuteAdHocScriptComponent } from './pages/ad-hoc-data-script/ad-hoc-execution/components/execute-ad-hoc-script/execute-ad-hoc-script.component';
import {UnderConstructonComponent} from "@core/modules/under-constructon/under-constructon.component";
import { ManageProductComponent } from './pages/manage-product/manage-product/manage-product.component';
import { AddProductComponent } from './pages/manage-product/manage-product/components/add-product/add-product.component';
import { UpdateProductComponent } from './pages/manage-product/manage-product/components/update-product/update-product.component';
import {MatLegacyButtonModule} from "@angular/material/legacy-button";
import {MatLegacyDialogModule} from "@angular/material/legacy-dialog";



const routes = [{
  /*path: '',
  // canActivate: [GuardService],
  component: LayoutComponent,
  children: [
    {
      path: 'error-code-maintenance', component: CribErrorCodeMaintenanceComponent,
      pathMatch: 'full',
      // canActivate: [GuardService],
      data: {
        breadcrumb: 'Error Code Maintenance',
        // allowedRoles : ['ADMIN_MODULE:Error_Code_Maintenance']
      }
    },
    {
      path: 'crib-catalogue-maintenance',
      component: CribCatalogueMaintenanceComponent,
      // canActivate: [GuardService],
      data: {
        breadcrumb: 'CRIB Catalogue Maintenance',
        // allowedRoles : ['ADMIN_MODULE:CRIB_Catalogue_Maintenance']
      }
    },
    {
      path: 'crib-catalogue-authorization',
      component: CribCatalogueAuthorizationComponent,
      // canActivate: [GuardService],
      data: {
        breadcrumb: 'CRIB Catalogue Authorization',
        // allowedRoles : ['ADMIN_MODULE:CRIB_Catalogue_Authorization']
      }
    }*/

  path: '',
  component: LayoutComponent,
  children: [

    {
      path: 'warehouse-product-maintenance',
      component: ManageProductComponent,
      data: {
        breadcrumb: 'Warehouse Product Maintenance',
      }
    },

    {
      path: 'under-construction',
      component: UnderConstructonComponent,

    }
  ]
}] as Routes;

@NgModule({

    declarations: [
        LayoutComponent,
        CribCatalogueMaintenanceComponent,
        AddCatalogPopoverComponent,
        CribErrorCodeMaintenanceComponent,
        CribAddErrorCodeDialogComponent,
        CribErrorCodeEditComponent,
        UpdateCribCatalogueDialogComponent,
        CribErrorCodeAuthorizationComponent,
        CribCatalogueAuthorizationComponent,
        CommercialSettingsComponent,
        ConsumerDcSettingsComponent,
        CommercialDcSettingsComponent,
        GeneralSettingsComponent,
        ConsumerSettingsComponent,
        CommonReportingSettingsViewComponent,
        CommonSegmentSettingsComponent,
        CommonGeneralSettingsComponent,
        CommonDataSourceComponent,
        CommonSegmentFieldsComponent,
        AddComponent,
        UpdateComponent,
        SystemReportingAuthorizationComponent,
        CommonAuthorizationComponent,
        CommonGeneralAuthorizationComponent,
        DataSourceAuthorizationComponent,
        CommonSettingAuthorizationComponent,
        DataMappingComponent,
        BusinessRuleMaintenanceComponent,
        TestConnectionComponent,
        FieldMappingComponent,
        ViewFieldComponent,
        DataMappingMenuComponent,
        AddBusinessRuleComponent,
        EditBusinessRuleComponent,
        BusinessRuleAuthorizationComponent,
        DataMappingAuthorizationComponent,
        TableConnectionComponent,
        FieldMappingAuthorizationComponent,
        TableConnectionDialogComponent,
        FilterConditionDialogComponent,
        FilterConditionDialogComponent,
        AdHocMaintenanceComponent,
        AdHocAuthorizationComponent,
        AddNewAdHocScriptComponent,
        UpdateAdHocScriptComponent,
        UpdateSegmentComponent,
        FinalQueryComponent,
        UploadErrorLogComponent,
        ViewErrorRecordComponent,
        CloseReportingComponent,
        ConfirmAndCloseSessionComponent,
        DataSourceTableConnectionMaintenanceComponent,
        DataSourceTableConnectionAuthorizationComponent,
        DataSourceTableConnectionAddComponent,
        DataSourceTableConnectionUpdateComponent,
        AdHocExecutionComponent,
        ExecuteAdHocScriptComponent,
        ManageProductComponent,
        AddProductComponent,
        UpdateProductComponent


    ],
    exports: [
        DataMappingMenuComponent
    ],
  imports: [
    CommonModule,
    NgZorroModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NzSpaceModule,
    NzTypographyModule,
    MatListModule,
    MatTabsModule,
    CodemirrorModule,
    NgOptimizedImage,
    MatChipsModule,
    AuthModule,
    NzStatisticModule,
    MatLegacyButtonModule,
    MatLegacyDialogModule,
  ]


})
export class AdminModule {
}
