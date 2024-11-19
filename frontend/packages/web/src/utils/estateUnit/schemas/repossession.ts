import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object } from 'yup';

export const getEstateUnitRepossessionSchema = (language: string, t: TFunction) =>
  object().shape({
    repossession: object()
      .nullable()
      .shape({
        eventDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('estate_unit.field.repossession_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.repossession_date', language, t)),
      }),
  });
