import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object } from 'yup';

export const getCadastralUnitInspectionSchema = (language: string, t: TFunction) =>
  object().shape({
    inspection: object()
      .nullable()
      .shape({
        date: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('cadastral_unit.field.inspection_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.inspection_date', language, t)),
        protocolDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('cadastral_unit.field.inspection_protocol_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.inspection_protocol_date', language, t)),
      }),
  });
