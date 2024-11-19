import { CadastralUnitInput, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { CadastralUnitFormInput } from '../../interfaces/FormInputs/CadastralUnit';
import { EstateUnitCadastralUnitFormInput } from '../../interfaces/FormInputs/EstateUnit';
import { parseAddressFormInputToAsstAddressInput } from '../components/addressesField/parseAddressFormInput';

export const parseEstateUnitCadastralUnitFormInputToEstateUnitCadastralUnitInput = (
  cadastralUnit: EstateUnitCadastralUnitFormInput,
  estateUnitType?: EstateUnitType | null,
  isVariation?: boolean,
): CadastralUnitInput => ({
  address: parseAddressFormInputToAsstAddressInput(cadastralUnit.address!),
  cadastralNotes: getStringOrNull(cadastralUnit.cadastralNotes),
  consortiumNotes: getStringOrNull(cadastralUnit.consortiumNotes),
  coordinates: cadastralUnit.coordinates.map((coordinates) => ({
    id: coordinates.coordinateId,
    itTavCorpo: getStringOrNull(coordinates.itTavCorpo),
    itTavPartita: getStringOrNull(coordinates.itTavPartita),
    itTavPorzione: getStringOrNull(coordinates.itTavPorzione),
    level1: getStringOrNull(coordinates.level1),
    level2: getStringOrNull(coordinates.level2),
    level3: getStringOrNull(coordinates.level3),
    level4: getStringOrNull(coordinates.level4),
    level5: getStringOrNull(coordinates.level5),
    notes: getStringOrNull(coordinates.notes),
    type: coordinates.coordinateType,
    unmanagedOverride: getStringOrNull(coordinates.unmanagedOverride),
  })),
  fiscalNotes: getStringOrNull(cadastralUnit.fiscalNotes),
  income: {
    cadastralAmount: cadastralUnit.income.cadastralAmount,
    macroCategory: getStringOrNull(cadastralUnit.income.macroCategory),
    cadastralLandCategoryId: cadastralUnit.income.cadastralLandCategory?.cadastralLandCategoryId,
    metric: cadastralUnit.income.metric,
    metricAmount: cadastralUnit.income.metricAmount,
    metricRentedAmount: cadastralUnit.income.metricRentedAmount,
    microCategory: getStringOrNull(cadastralUnit.income.microCategory),
    registeredSurface: cadastralUnit.income.registeredSurface,
    type: cadastralUnit.income.incomeType,
    farmAmount: cadastralUnit.income.farmAmount,
    landAmount: cadastralUnit.income.landAmount,
    marketValue: cadastralUnit.income.marketValue,
  },
  inspection: cadastralUnit.inspection
    ? {
        date: parseDateToString(cadastralUnit.inspection.date),
        heading: getStringOrNull(cadastralUnit.inspection.heading),
        isDirectRestriction: cadastralUnit.inspection.isDirectRestriction,
        isHistoricalEstate: cadastralUnit.inspection.isHistoricalEstate,
        macroZone: getStringOrNull(cadastralUnit.inspection.macroZone),
        microZone: getStringOrNull(cadastralUnit.inspection.microZone),
        protocolDate: parseDateToString(cadastralUnit.inspection.protocolDate),
        protocolNumber: getStringOrNull(cadastralUnit.inspection.protocolNumber),
      }
    : null,
  internalCode: isVariation ? null : cadastralUnit.internalCode,
  isAncillaryUnit: cadastralUnit.isAncillaryUnit,
  isCadastralRegistrationInProgress: cadastralUnit.isCadastralRegistrationInProgress,
  since: parseDateToString(isVariation ? cadastralUnit.changed : cadastralUnit.since),
  status: cadastralUnit.status,
  type: estateUnitType,
  unavailabilities: cadastralUnit.unavailabilities.map((unavailability) => ({
    id: unavailability.unavailabilityId,
    notes: getStringOrNull(unavailability.notes),
    since: parseDateToString(unavailability.since),
    until: parseDateToString(unavailability.until),
  })),
  until: parseDateToString(cadastralUnit.until),
});

export const parseCadastralUnitFormInputToCadastralUnitInput = (
  cadastralUnit: CadastralUnitFormInput,
  isVariation?: boolean,
): CadastralUnitInput => ({
  ...parseEstateUnitCadastralUnitFormInputToEstateUnitCadastralUnitInput(
    cadastralUnit,
    cadastralUnit.estateUnit?.type,
    isVariation,
  ),
  estateUnitId: cadastralUnit.estateUnit!.id,
  taxConfig: cadastralUnit.taxCalculators.flatMap(({ fields, taxCalculatorId }) =>
    fields.flatMap((fields) =>
      fields.map((field) => ({
        isMandatory: field.isMandatory,
        name: field.name,
        taxCalculatorId,
        templateTypeId: field.templateTypeId,
        type: field.fieldType,
        value: field.value,
      })),
    ),
  ),
});
