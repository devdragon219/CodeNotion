import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';

import { CadastralUnitFormViewerFieldFormInput } from '../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitCoordinatesSchema } from './coordinates';
import { getCadastralUnitEstateUnitSchema } from './estateUnit';
import { getCadastralUnitFiscalDataSchema } from './fiscalData';
import { getCadastralUnitGeneralDataSchema } from './generalData';
import { getCadastralUnitInspectionSchema } from './inspection';
import { getCadastralUnitUnavailabilitiesSchema } from './unavailabilities';

export const getCadastralUnitSchema = (
  coordinateType: CoordinateType,
  language: string,
  t: TFunction,
  options?: { minDate?: Date; referenceFields?: CadastralUnitFormViewerFieldFormInput[]; variation?: boolean },
) =>
  getCadastralUnitEstateUnitSchema(t)
    .concat(getCadastralUnitGeneralDataSchema(language, t, options))
    .concat(getCadastralUnitCoordinatesSchema(coordinateType, t))
    .concat(getCadastralUnitInspectionSchema(language, t))
    .concat(getCadastralUnitUnavailabilitiesSchema(language, t))
    .concat(getCadastralUnitFiscalDataSchema(t, options?.referenceFields));
