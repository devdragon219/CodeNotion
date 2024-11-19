import { CadastralUnitStatus, CoordinateType } from '@realgimm5/frontend-common/gql/types';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  CadastralCoordinateFormInput,
  CadastralInspectionFormInput,
  CadastralUnavailabilityFormInput,
  CadastralUnitFormInput,
} from '../../interfaces/FormInputs/CadastralUnit';
import { copyAddressFormInput } from '../components/addressesField/copyAddressFormInput';

export const getEmptyCadastralInspectionFormInput = (): CadastralInspectionFormInput => ({
  heading: '',
  date: null,
  macroZone: '',
  microZone: '',
  protocolDate: null,
  protocolNumber: '',
  isDirectRestriction: false,
  isHistoricalEstate: false,
});

export const getEmptyCadastralCoordinatesFormInput = (
  coordinateType: CoordinateType,
): CadastralCoordinateFormInput => ({
  coordinateId: null,
  coordinateType,
  hasITTavData: false,
  itTavPartita: '',
  itTavCorpo: '',
  itTavPorzione: '',
  level1: '',
  level2: '',
  level3: '',
  level4: '',
  level5: '',
  notes: '',
  unmanagedOverride: '',
});

export const getEmptyCadastralUnavailabilityFormInput = (): CadastralUnavailabilityFormInput => ({
  notes: '',
  since: null,
  unavailabilityId: null,
  until: null,
});

export const getEmptyCadastralUnitFormInput = (estateUnit?: EstateUnitFragment): CadastralUnitFormInput => ({
  address: copyAddressFormInput(estateUnit?.address),
  cadastralNotes: '',
  cadastralUnitId: null,
  changed: new Date(),
  consortiumNotes: '',
  coordinates: [],
  estateUnit: estateUnit ?? null,
  fiscalNotes: '',
  history: [],
  income: {
    cadastralCategory: null,
    cadastralLandCategory: null,
    macroCategory: '',
    microCategory: '',
    metric: null,
    metricAmount: null,
    metricRentedAmount: null,
    registeredSurface: null,
    incomeType: null,
    cadastralAmount: null,
    farmAmount: null,
    landAmount: null,
    marketValue: null,
  },
  inspection: null,
  internalCode: '',
  isAncillaryUnit: false,
  isCadastralRegistrationInProgress: false,
  since: null,
  status: CadastralUnitStatus.Existing,
  taxCalculators: [],
  taxPayments: [],
  unavailabilities: [],
  until: null,
});
