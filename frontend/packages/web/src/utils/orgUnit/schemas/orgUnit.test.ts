import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyOrgUnitFormInput } from '../initialValues';
import { getOrgUnitSchema } from './orgUnit';

describe('org-unit.org-unit-schema', () => {
  const schema = getOrgUnitSchema(true, null, 'en', mockTFunction);
  const orgUnitType = OrgUnitType.GeographicalHierarchy;

  it('should fail', () => {
    const input = getEmptyOrgUnitFormInput(orgUnitType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyOrgUnitFormInput(orgUnitType),
      managementSubject: {},
      internalCode: 'internalCode',
      entryDescription: 'entryDescription',
      entryStatus: 'entryStatus',
      closureDate: MIN_DATE,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});