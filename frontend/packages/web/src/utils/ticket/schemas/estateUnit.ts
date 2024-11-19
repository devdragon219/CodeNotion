import { TFunction } from 'i18next';
import { object } from 'yup';

export const getTicketEstateUnitSchema = (t: TFunction) =>
  object().shape({
    locationEstateUnit: object().required(t('ticket.error.no_estate_unit_selected')),
  });
