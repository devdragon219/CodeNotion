import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getTicketChecklistsEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    estateUnits: array().min(1, t('ticket_checklist.error.no_estate_units_selected')),
  });

export const getTicketChecklistsTicketChecklistTemplatesSchema = (t: TFunction) =>
  object().shape({
    ticketChecklistTemplates: array().min(1, t('ticket_checklist.error.no_ticket_checklist_templates_selected')),
  });

export const getTicketChecklistsSchema = (t: TFunction) =>
  getTicketChecklistsEstateUnitsSchema(t).concat(getTicketChecklistsTicketChecklistTemplatesSchema(t));
