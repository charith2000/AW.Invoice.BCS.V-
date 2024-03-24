export interface DataAmend {
  columnName: string;
  type: number;
  data: Datum[];
}

export interface Datum {
  key: string;
  value: string;
}
