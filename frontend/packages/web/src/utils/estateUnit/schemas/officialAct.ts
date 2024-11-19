import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, string } from 'yup';

export const getEstateUnitOfficialActSchema = (language: string, t: TFunction) =>
  object().shape({
    officialAct: object()
      .nullable()
      .shape({
        protocolNumber: string().required(getRequiredTranslation('estate_unit.field.official_act_protocol_number', t)),
        notaryActDate: date()
          .required(getRequiredTranslation('estate_unit.field.official_act_notary_act_date', t))
          .min(MIN_DATE, getDateMinTranslation('estate_unit.field.official_act_notary_act_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.official_act_notary_act_date', language, t)),
        registrationDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('estate_unit.field.official_act_registration_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.official_act_registration_date', language, t)),
        transcriptionDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('estate_unit.field.official_act_transcription_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('estate_unit.field.official_act_transcription_date', language, t)),
      }),
  });
