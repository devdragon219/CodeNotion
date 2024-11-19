import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, string } from 'yup';

export const getTicketArticleSchema = (t: TFunction, validateAll = true) =>
  object().shape({
    internalCode: string().requiredIf(validateAll, getRequiredTranslation('ticket.field.quote_article_code', t)),
    name: string().requiredIf(validateAll, getRequiredTranslation('ticket.field.quote_article_name', t)),
    unitPrice: number().requiredIf(validateAll, getRequiredTranslation('ticket.field.quote_article_price', t)),
    quantity: number().requiredIf(validateAll, getRequiredTranslation('ticket.field.quote_article_quantity', t)),
    measurementUnit: object().requiredIf(validateAll, getRequiredTranslation('ticket.field.quote_article_unit', t)),
  });

export const getTicketArticlesSchema = (t: TFunction, validateAll = true) =>
  object().shape({
    articles: array().min(1, t('ticket.error.no_articles_selected')).of(getTicketArticleSchema(t, validateAll)),
  });

export const getTicketQuoteSchema = (language: string, mode: FormMode, t: TFunction) =>
  object().shape({
    quote: object().when('isExcludedFromMaintenanceContract', {
      is: true,
      then: (schema) =>
        mode === FormMode.Create
          ? schema
          : schema
              .shape({
                masterStatus: string().required(getRequiredTranslation('ticket.field.quote_status', t)),
                interventionDueDate: date()
                  .required(getRequiredTranslation('ticket.field.quote_due_date', t))
                  .min(MIN_DATE, getDateMinTranslation('ticket.field.quote_due_date', language, t))
                  .max(MAX_DATE, getDateMaxTranslation('ticket.field.quote_due_date', language, t)),
              })
              .concat(getTicketArticlesSchema(t)),
    }),
  });
