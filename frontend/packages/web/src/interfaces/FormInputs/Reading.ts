export interface ReadingValueFormInput {
  readingValueId: number | null;
  touRateIndex: number;
  value: number | null;
}

export interface ReadingFormInput {
  isEstimated: boolean;
  notes: string;
  readingId: number | null;
  readingTimestamp: Date | null;
  utilityServiceId: number;
  values: ReadingValueFormInput[];
}
