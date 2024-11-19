import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getTicketCatalogueItemsSchema = (t: TFunction) =>
  object().shape({
    catalogueItems: array().when('mainType', ([mainType], schema) => {
      return schema.min(
        1,
        mainType === TicketMainType.ChecklistOnTriggerCondition
          ? t('ticket.error.no_catalogue_items_selected')
          : getRequiredTranslation('ticket.field.catalogue_type', t),
      );
    }),
  });
