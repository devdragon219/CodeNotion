import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { ReadingFragment } from '../../gql/RealGimm.Web.Reading.fragment';
import { ReadingFormInput } from '../../interfaces/FormInputs/Reading';

export const parseReadingToReadingFormInput = (
  reading: ReadingFragment,
  utilityServiceId: number,
): ReadingFormInput => ({
  isEstimated: reading.isEstimated,
  notes: reading.notes ?? '',
  readingId: reading.id,
  readingTimestamp: parseStringToDate(reading.readingTimestamp),
  utilityServiceId,
  values: reading.values.map((value) => ({
    readingValueId: value.id,
    touRateIndex: value.touRateIndex,
    value: value.value ?? null,
  })),
});
