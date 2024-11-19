import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getTicketChecklistTemplateGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('ticket_checklist_template.field.internal_code', t))
      .valid(canUseInternalCode, t('ticket_checklist_template.error.internal_code')),
    name: string().required(getRequiredTranslation('ticket_checklist_template.field.name', t)),
    catalogueCategory: object().required(
      getRequiredTranslation('ticket_checklist_template.field.catalogue_category', t),
    ),
    catalogueSubCategory: object().required(
      getRequiredTranslation('ticket_checklist_template.field.catalogue_subcategory', t),
    ),
    catalogueType: object().required(getRequiredTranslation('ticket_checklist_template.field.catalogue_type', t)),
    ticketChecklistTemplateType: string().required(
      getRequiredTranslation('ticket_checklist_template.field.ticket_checklist_template_type', t),
    ),
  });
