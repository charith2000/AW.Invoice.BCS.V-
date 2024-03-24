import { NgModule } from '@angular/core';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import { IconDefinition } from '@ant-design/icons-angular';
import { StepBackwardOutline, CaretLeftOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzPipesModule} from "ng-zorro-antd/pipes";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
];

@NgModule({
  exports: [
    NzDropDownModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzModalModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzBadgeModule,
    NzInputNumberModule,
    NzTimePickerModule,
    NzSpinModule,
    NzStepsModule,
    NzProgressModule,
    NzBreadCrumbModule,
    NzUploadModule,
    NzDrawerModule,
    NzAvatarModule,
    NzDividerModule,
    NzPopoverModule,
    NzAlertModule,
    NzAutocompleteModule,
    NzPipesModule,
    NzPaginationModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzResultModule,
    NzCollapseModule,
    NzToolTipModule,
    NzSwitchModule,
    NzTabsModule,
    NzNotificationModule,
    NzPageHeaderModule

  ],
  imports: [
    NzIconModule.forChild(icons)
  ]
})
export class NgZorroModule { }
