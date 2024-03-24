export interface BusinessRule{
  businessRuleId: number;
  reportingSegmentId: string;
  reportingId: string;
  segmentName: string;
  description: string;
  ruleExecutionPoint: number;
  sequence: number;
  query: string;
  status: number;
  authorizedStatus: number;
}
