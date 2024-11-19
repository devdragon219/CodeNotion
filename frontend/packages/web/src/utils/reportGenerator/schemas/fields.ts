import { getFormViewerSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getReportGeneratorFieldsSchema = (t: TFunction) =>
  object().shape({
    fields: getFormViewerSchema(t),
  });
