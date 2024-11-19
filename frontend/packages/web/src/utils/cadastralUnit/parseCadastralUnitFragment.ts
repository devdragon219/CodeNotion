import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys, TFunction } from 'i18next';

import {
  CadastralUnitDetailFragment,
  EstateUnitCadastralUnitDetailFragment,
} from '../../gql/RealGimm.Web.CadastralUnit.fragment';
import { CadastralUnitFormInput } from '../../interfaces/FormInputs/CadastralUnit';
import { EstateUnitCadastralUnitFormInput } from '../../interfaces/FormInputs/EstateUnit';
import { parseCadastralLandCategoryToCadastralLandCategoryFormInput } from '../cadastralLandCategory/parseCadastralLandCategoryFragment';
import { parseAddressToAddressFormInput } from '../components/addressesField/parseAddressFragment';
import { parseTaxCalculatorCode } from '../components/taxConfig/taxConfigUtils';

export const parseEstateUnitCadastralUnitToEstateUnitCadastralUnitFormInput = (
  cadastralUnit: EstateUnitCadastralUnitDetailFragment,
): EstateUnitCadastralUnitFormInput => ({
  address: parseAddressToAddressFormInput(cadastralUnit.address),
  cadastralNotes: cadastralUnit.cadastralNotes ?? '',
  cadastralUnitId: cadastralUnit.id,
  changed: new Date(),
  consortiumNotes: cadastralUnit.consortiumNotes ?? '',
  coordinates: cadastralUnit.coordinates.map((coordinate) => ({
    coordinateId: coordinate.id,
    coordinateType: coordinate.coordinateType,
    hasITTavData: coordinate.hasITTavData,
    cadastralCoordinateId: coordinate.id,
    itTavCorpo: coordinate.itTavCorpo ?? '',
    itTavPartita: coordinate.itTavPartita ?? '',
    itTavPorzione: coordinate.itTavPorzione ?? '',
    level1: coordinate.level1 ?? '',
    level2: coordinate.level2 ?? '',
    level3: coordinate.level3 ?? '',
    level4: coordinate.level4 ?? '',
    level5: coordinate.level5 ?? '',
    notes: coordinate.notes ?? '',
    unmanagedOverride: coordinate.unmanagedOverride ?? '',
  })),
  fiscalNotes: cadastralUnit.fiscalNotes ?? '',
  income: {
    cadastralCategory: cadastralUnit.income.cadastralCategory
      ? {
          description: cadastralUnit.income.cadastralCategory.description,
          externalCode: cadastralUnit.income.cadastralCategory.externalCode,
          id: cadastralUnit.income.cadastralCategory.id,
        }
      : null,
    cadastralLandCategory: cadastralUnit.income.cadastralLandCategory
      ? parseCadastralLandCategoryToCadastralLandCategoryFormInput(cadastralUnit.income.cadastralLandCategory)
      : null,
    macroCategory: cadastralUnit.income.macroCategory ?? '',
    microCategory: cadastralUnit.income.microCategory ?? '',
    metric: cadastralUnit.income.metric ?? null,
    metricAmount: cadastralUnit.income.metricAmount ?? null,
    metricRentedAmount: cadastralUnit.income.metricRentedAmount ?? null,
    registeredSurface: cadastralUnit.income.registeredSurface ?? null,
    incomeType: cadastralUnit.income.type ?? null,
    cadastralAmount: cadastralUnit.income.cadastralAmount ?? null,
    farmAmount: cadastralUnit.income.farmAmount ?? null,
    landAmount: cadastralUnit.income.landAmount ?? null,
    marketValue: cadastralUnit.income.marketValue ?? null,
  },
  inspection: cadastralUnit.inspection
    ? {
        heading: cadastralUnit.inspection.heading ?? '',
        date: parseStringToDate(cadastralUnit.inspection.date),
        macroZone: cadastralUnit.inspection.macroZone ?? '',
        microZone: cadastralUnit.inspection.microZone ?? '',
        protocolDate: parseStringToDate(cadastralUnit.inspection.protocolDate),
        protocolNumber: cadastralUnit.inspection.protocolNumber ?? '',
        isDirectRestriction: cadastralUnit.inspection.isDirectRestriction,
        isHistoricalEstate: cadastralUnit.inspection.isHistoricalEstate,
      }
    : null,
  internalCode: cadastralUnit.internalCode,
  isAncillaryUnit: cadastralUnit.isAncillaryUnit,
  isCadastralRegistrationInProgress: cadastralUnit.isCadastralRegistrationInProgress,
  since: parseStringToDate(cadastralUnit.since),
  status: cadastralUnit.status,
  unavailabilities: cadastralUnit.unavailabilities.map((unavailability) => ({
    notes: unavailability.notes ?? '',
    since: parseStringToDate(unavailability.since),
    unavailabilityId: unavailability.id,
    until: parseStringToDate(unavailability.until),
  })),
  until: parseStringToDate(cadastralUnit.until),
});

export const parseCadastralUnitToCadastralUnitFormInput = (
  cadastralUnit: CadastralUnitDetailFragment,
  t: TFunction,
): CadastralUnitFormInput => ({
  ...parseEstateUnitCadastralUnitToEstateUnitCadastralUnitFormInput(cadastralUnit),
  estateUnit: cadastralUnit.estateUnit,
  history: cadastralUnit.history,
  taxCalculators: cadastralUnit.taxCalculators.map((taxCalculator) => ({
    fields: taxCalculator.form.map((fields) =>
      fields.map((field) => ({
        fieldType: field.type,
        isMandatory: field.isMandatory,
        label: t(`cadastral_unit.field.${parseTaxCalculatorCode(field.name ?? '')}` as ParseKeys),
        name: field.name ?? '',
        taxCalculatorId: taxCalculator.taxCalculator,
        templateTypeId: field.id,
        validValues:
          field.validValues?.map((validValue) => ({
            // This mapping is intended, backend is returning key:value as value:label
            label: validValue.value,
            value: validValue.key,
          })) ?? [],
        value: cadastralUnit.taxConfig.find(({ templateTypeId }) => templateTypeId === field.id)?.value ?? '',
      })),
    ),
    name: taxCalculator.name,
    taxCalculatorId: taxCalculator.taxCalculator,
  })),
  taxPayments: cadastralUnit.taxPayments.map(({ id, taxCalculator, year, expectedInstallments, installments }) => ({
    id,
    expectedInstallments,
    taxCalculator,
    year,
    installments: installments.map(({ amountPaid, date, installmentsPaid }) => ({
      amountPaid,
      date: parseStringToDate(date),
      installmentsPaid,
    })),
  })),
});
