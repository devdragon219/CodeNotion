import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getReportGeneratorGeneralDataSchema = (t: TFunction) =>
  object().shape({
    report: object().required(getRequiredTranslation('report_generator.field.report', t)),
    formats: array().min(1, getRequiredTranslation('report_generator.field.format', t)),
  });
