export interface ReportingSegmentModel {
  reportingSegmentId: string;
  reportingId: string;
  segmentName: string;
  reportingSegmentFields : ReportingSegmentFieldModel [];
}

export interface ReportingSegmentFieldModel {
  reportingSegmentFieldId: number
  name: string,
  options: string,
  type: string,
  length: number,
  description: string
  catalogueType: string;
}
