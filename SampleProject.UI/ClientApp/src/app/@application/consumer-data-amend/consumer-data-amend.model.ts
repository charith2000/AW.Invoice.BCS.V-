export interface ConsumerDataAmendModel {
  columnName: string;
  type: number;
  data: Datum[];
}

export interface Datum {
  key: string;
  value: string;
}
export interface DataAmendMaintenance {
  columnName: string;
  type: number;
  data: Datum[];
  fieldName: string;
  fieldValue: string;
  description: string[];
  verification: boolean;
  bureauRequirement: string;
}

export interface Datum {
  key: string;
  value: string;
}
