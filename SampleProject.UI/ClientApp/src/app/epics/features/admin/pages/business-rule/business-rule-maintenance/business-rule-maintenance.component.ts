import {ChangeDetectionStrategy, Component, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {BaseComponent} from "@core/components/base/base.component";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {AddBusinessRuleComponent} from "./components/add-business-rule/add-business-rule.component";
import {EditBusinessRuleComponent} from "./components/edit-business-rule/edit-business-rule.component";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-business-rule-maintenance',
  templateUrl: './business-rule-maintenance.component.html',
  styleUrls: ['./business-rule-maintenance.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BusinessRuleMaintenanceComponent extends BaseComponent implements OnChanges {


  selectedReportingType = null;
  businessRules?: Observable<BusinessRule[]>;
  isPopupOpen = false;
  filterValue : string = '';
  filteredRecodes? :  Observable<BusinessRule[]>;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.segmentId.currentValue && changes.segmentId.previousValue != changes.segmentId.currentValue) {
      this.onSelectReportingType = changes.segmentId.currentValue;
      this.onSelectReportingType(this.selectedReportingType);
    }
  }

  openAddRecordDialog() {
    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(AddBusinessRuleComponent, {
        data: {
          selectedRule: this.selectedReportingType,
        },
        width: "1000px",
      });

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false;
          this.onSelectReportingType(this.selectedReportingType ?? '')
        });
    }
  }

  openEditRecordDialog(record: BusinessRule) {
    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRefAddOpen = this.dialog.open(EditBusinessRuleComponent,
        {
          data: {
            businessRuleId: record.businessRuleId,
            selectedRule: this.selectedReportingType,
            reportingSegmentId: record.reportingSegmentId,
            segmentName: record.segmentName,
            description: record.description,
            ruleExecutionPoint: record.ruleExecutionPoint,
            sequence: record.sequence,
            query: record.query,
            status: record.status
          },
          width: "1000px"
        }
      );

      dialogRefAddOpen.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.onSelectReportingType(this.selectedReportingType ?? '')
        })
    }
  }


  onSelectReportingType($event: any) {
    this.getBusinessRulesByReportingType($event)
  }

  private getBusinessRulesByReportingType(type: string) {

    if (type === 'All') {
      this.businessRules = this.apiBaseService.get<BusinessRule[]>([BusinessRuleApi.BusinessRule], true, true);
      this.filteredRecodes = this.businessRules
    } else {
      this.businessRules = this.apiBaseService.get<BusinessRule[]>([`${BusinessRuleApi.BusinessRule}?$filter=reportingId eq '${type}'`], true, true);
      this.filteredRecodes = this.businessRules
    }

  }

  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-danger';
    }
  }

  authorizeStatusChip(authorizedStatus: number): string {
    if (authorizedStatus == 1) {
      return 'alert alert-success';
    }if (authorizedStatus == 2) {
      return  'alert alert-warning';
    }
    else {
      return 'alert alert-danger';
    }
  }
  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredRecodes = this.businessRules;
    } else {
      this.filteredRecodes = this.businessRules?.pipe(
        map(records => records.filter(record =>
          record.segmentName.toLowerCase().includes(filterValueLower!) || record.description.toLowerCase().includes(filterValueLower!) ||
          record.ruleExecutionPoint.toString().includes(filterValueLower!) ||  record.reportingSegmentId.toLowerCase().includes(filterValueLower!) ||
          record.sequence.toString().includes(filterValueLower!)
        ))
      );

    }
  }



}
