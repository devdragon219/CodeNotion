import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityServiceFormInput } from '../../utilityService/initialValues';
import { getEmptyReadingFormInput } from '../initialValues';
import { getReadingSchema } from './reading';

describe('org-unit.general-data-schema', () => {
  const schemaForReading = getReadingSchema(true, 'en', mockTFunction);

  it('should fail on empty form input', () => {
    const input = getEmptyReadingFormInput(getEmptyUtilityServiceFormInput());
    expect(schemaForReading.isValidSync(input)).toBe(false);
  });

  it('should fail on null values', () => {
    const input = {
      ...getEmptyReadingFormInput(getEmptyUtilityServiceFormInput()),
      readingTimestamp: new Date(),
      values: [
        {
          value: null,
        },
      ],
    };
    expect(schemaForReading.isValidSync(input)).toBe(false);
  });

  it('should succeed on valid values', () => {
    const input = {
      ...getEmptyReadingFormInput(getEmptyUtilityServiceFormInput()),
      readingTimestamp: new Date(),
      values: [
        {
          value: 10,
        },
      ],
    };
    expect(schemaForReading.isValidSync(input)).toBe(true);
  });

  const schemaForUsage = getReadingSchema(false, 'en', mockTFunction);

  it('should fail on empty form input', () => {
    const input = getEmptyReadingFormInput(getEmptyUtilityServiceFormInput());
    expect(schemaForUsage.isValidSync(input)).toBe(false);
  });

  it('should fail on null values', () => {
    const input = {
      ...getEmptyReadingFormInput(getEmptyUtilityServiceFormInput()),
      readingTimestamp: new Date(),
      values: [
        {
          value: null,
        },
      ],
    };
    expect(schemaForUsage.isValidSync(input)).toBe(false);
  });

  it('should succeed on valid values', () => {
    const input = {
      ...getEmptyReadingFormInput(getEmptyUtilityServiceFormInput()),
      readingTimestamp: new Date(),
      values: [
        {
          value: 10,
        },
      ],
    };
    expect(schemaForUsage.isValidSync(input)).toBe(true);
  });
});
