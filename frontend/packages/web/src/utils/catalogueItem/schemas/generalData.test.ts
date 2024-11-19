import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { add } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../../catalogueType/initialValues';
import { getEmptyCatalogueItemFormInput } from '../initialValues';
import { getCatalogueItemGeneralDataSchema } from './generalData';

describe('catalogue-item.general-data-schema', () => {
  const schemaWithEmptyCanUseInternalCodes = getCatalogueItemGeneralDataSchema({}, 'en', mockTFunction);

  it('should fail on empty form input', () => {
    const input = getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput());
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should succeed on minimum valid values', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: 'status',
      activationDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(true);
  });

  it('should fail decommissioned status and null activationDate', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: EstateStatus.Decommissioned,
      decommissioningDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should fail decommissioned status and activationDate after decommissioningDate', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: EstateStatus.Decommissioned,
      activationDate: add(MIN_DATE, { days: 3 }),
      decommissioningDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 4 }),
    };
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should fail decommissioned status and activationDate after lastMaintenanceDate and decommissioningDate', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: EstateStatus.Decommissioned,
      activationDate: add(MIN_DATE, { days: 3 }),
      decommissioningDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should succeed on minimum valid values', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: 'status',
      activationDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithEmptyCanUseInternalCodes.isValidSync(input)).toBe(true);
  });

  const schemaWithValidInternalCodes = getCatalogueItemGeneralDataSchema(
    {
      internalCode: true,
    },
    'en',
    mockTFunction,
  );

  it('should fail', () => {
    const input = getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput());
    expect(schemaWithValidInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: 'status',
      guid: 'internalCode',
      activationDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithValidInternalCodes.isValidSync(input)).toBe(true);
  });

  const schemaWithInvalidInternalCodes = getCatalogueItemGeneralDataSchema(
    {
      internalCode: false,
    },
    'en',
    mockTFunction,
  );

  it('should fail on empty form input', () => {
    const input = getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput());
    expect(schemaWithInvalidInternalCodes.isValidSync(input)).toBe(false);
  });

  it('should fail due to invalid internal code', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      internalCode: 'internalCode',
      status: 'status',
      guid: 'internalCode',
      activationDate: add(MIN_DATE, { days: 1 }),
      lastMaintenanceDate: add(MIN_DATE, { days: 2 }),
    };
    expect(schemaWithInvalidInternalCodes.isValidSync(input)).toBe(false);
  });
});
