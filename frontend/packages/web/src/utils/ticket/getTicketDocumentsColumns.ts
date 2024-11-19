import { getDocumentsTableColumns } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getTicketDocumentFieldsConfig } from './getTicketDocumentFieldsConfig';

export const getTicketDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    fieldsConfig: getTicketDocumentFieldsConfig(),
    useFilter: false,
  });
