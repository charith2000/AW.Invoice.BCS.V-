import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Observable} from "rxjs";
import {
  ReportingSegmentFieldModel,
  ReportingSegmentModel
} from "@application/common-reporting-settings/reporting-segment.model";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";

@Component({
  selector: 'app-common-segment-settings',
  templateUrl: './common-segment-settings.component.html',
  styleUrls: ['./common-segment-settings.component.css'],
})
export class CommonSegmentSettingsComponent implements OnInit {
  reportingSegments?: Observable<ReportingSegmentModel[]>;
  @Input() code: string = '';
  @Input() fields: ReportingSegmentFieldModel[] = [];
  selectedSegmentId: string | undefined;
  selectedSegmentFields: ReportingSegmentFieldModel[] = [];

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService,
              private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.reportingSegments = this.apiBaseService.get<ReportingSegmentModel[]>(
      [ReportingMasterDataApi.reportingSettings, this.code, ReportingMasterDataApi.segments]
    );
  }

  onShowSegmentFields(fields: ReportingSegmentFieldModel[], reportingSegmentId: string): void {
    this.selectedSegmentFields = fields;
    this.selectedSegmentId = reportingSegmentId;
  }
}
