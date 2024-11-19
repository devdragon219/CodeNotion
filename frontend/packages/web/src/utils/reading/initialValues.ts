import { ReadingFormInput, ReadingValueFormInput } from '../../interfaces/FormInputs/Reading';
import { UtilityServiceFormInput } from '../../interfaces/FormInputs/UtilityService';

export const getEmptyReadingValueFormInput = (touRateIndex: number): ReadingValueFormInput => ({
  readingValueId: null,
  touRateIndex,
  value: null,
});

export const getEmptyReadingFormInput = (utilityService: UtilityServiceFormInput): ReadingFormInput => ({
  isEstimated: false,
  notes: '',
  readingId: null,
  readingTimestamp: null,
  utilityServiceId: Number(utilityService.utilityServiceId),
  values: Array.from(Array(utilityService.utilityType?.timeOfUseRateCount ?? 0)).map((_, index) =>
    getEmptyReadingValueFormInput(index),
  ),
});
