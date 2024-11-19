import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCalendarFormInput } from '../initialValues';
import { getCalendarSchema } from './calendar';

describe('calendar.calendar-schema', () => {
  const schema = getCalendarSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCalendarFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCalendarFormInput(),
      name: 'name',
      timeZone: 'timeZone',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
