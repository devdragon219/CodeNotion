import { CadastralUnitStatus, CoordinateType, IncomeMetric, IncomeType } from '@realgimm5/frontend-common/gql/types';
import { FormViewerFieldFormInput, SelectOption } from '@realgimm5/frontend-common/interfaces';

import { CadastralUnitDetailFragment } from '../../gql/RealGimm.Web.CadastralUnit.fragment';
import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { CadastralCategoryFieldValue } from '../FieldValues/CadastralCategory';
import { AddressFormInput } from './Addresses';
import { CadastralLandCategoryFormInput } from './CadastralLandCategory';

export interface CadastralCoordinateFormInput {
  coordinateId: number | null;
  coordinateType: CoordinateType;
  hasITTavData: boolean;
  itTavPartita: string;
  itTavCorpo: string;
  itTavPorzione: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  notes: string;
  unmanagedOverride: string;
}

export interface CadastralUnitFormViewerFieldFormInput extends Omit<FormViewerFieldFormInput, 'validValues'> {
  name: string;
  taxCalculatorId: string;
  validValues: SelectOption<string>[];
}

export interface CadastralInspectionFormInput {
  heading: string;
  date: Date | null;
  isDirectRestriction: boolean;
  isHistoricalEstate: boolean;
  macroZone: string;
  microZone: string;
  protocolDate: Date | null;
  protocolNumber: string;
}

export interface CadastralUnitTaxCalculatorFormInput {
  fields: CadastralUnitFormViewerFieldFormInput[][];
  name: string;
  taxCalculatorId: string;
}

export interface CadastralUnitTaxPaymentFormInput {
  id: number;
  expectedInstallments: number;
  taxCalculator: string;
  year: number;
  installments: {
    installmentsPaid: number[];
    amountPaid: number;
    date: Date | null;
  }[];
}

export interface CadastralUnavailabilityFormInput {
  notes: string;
  since: Date | null;
  unavailabilityId: number | null;
  until: Date | null;
}

export interface CadastralUnitFormInput {
  address: AddressFormInput | null;
  cadastralNotes: string;
  cadastralUnitId: number | null;
  changed: Date | null;
  consortiumNotes: string;
  coordinates: CadastralCoordinateFormInput[];
  estateUnit: EstateUnitFragment | null;
  fiscalNotes: string;
  history: CadastralUnitDetailFragment['history'];
  income: {
    cadastralCategory: CadastralCategoryFieldValue | null;
    cadastralLandCategory: CadastralLandCategoryFormInput | null;
    macroCategory: string;
    microCategory: string;
    metric: IncomeMetric | null;
    metricAmount: number | null;
    metricRentedAmount: number | null;
    registeredSurface: number | null;
    incomeType: IncomeType | null;
    cadastralAmount: number | null;
    farmAmount: number | null;
    landAmount: number | null;
    marketValue: number | null;
  };
  inspection: CadastralInspectionFormInput | null;
  internalCode: string;
  isAncillaryUnit: boolean;
  isCadastralRegistrationInProgress: boolean;
  since: Date | null;
  status: CadastralUnitStatus | null;
  taxCalculators: CadastralUnitTaxCalculatorFormInput[];
  taxPayments: CadastralUnitTaxPaymentFormInput[];
  unavailabilities: CadastralUnavailabilityFormInput[];
  until: Date | null;
}
