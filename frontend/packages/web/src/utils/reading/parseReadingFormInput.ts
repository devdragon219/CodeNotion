import { ReadingInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { ReadingFormInput } from '../../interfaces/FormInputs/Reading';

export const parseReadingFormInputToReadingInput = (reading: ReadingFormInput): ReadingInput => ({
  isEstimated: reading.isEstimated,
  notes: getStringOrNull(reading.notes),
  readingTimestamp: parseDateToString(reading.readingTimestamp)!,
  utilityServiceId: reading.utilityServiceId,
  values: reading.values.map((value) => ({
    id: value.readingValueId,
    touRateIndex: value.touRateIndex,
    value: value.value,
  })),
});
