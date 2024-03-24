export interface Catalogue {
  segmentId: string;
  columnName: string;
  type: number;
  data: Datum[];
}

export interface Datum {
  key: string;
  value: string;
}
