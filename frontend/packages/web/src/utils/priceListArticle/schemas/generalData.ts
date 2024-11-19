import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, ref, string } from 'yup';

import { PriceListArticlePricePeriodFormInput } from '../../../interfaces/FormInputs/PriceListArticle';

export const getPriceListArticlePricePeriodSchema = (
  language: string,
  pricePeriods: PriceListArticlePricePeriodFormInput[],
  t: TFunction,
) =>
  object().shape(
    {
      since: date()
        .required(getRequiredTranslation('price_list_article.field.date_since', t))
        .min(MIN_DATE, getDateMinTranslation('price_list_article.field.date_since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('price_list_article.field.date_since', language, t))
        .when('until', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('until'),
              getDateNotAfterTranslation(
                'price_list_article.field.date_since',
                'price_list_article.field.date_until',
                t,
              ),
            ),
        })
        .test('validSince', function (value) {
          const { createError, path } = this;
          const existingSince = pricePeriods.find(
            ({ since, until }) => since && value >= since && (!until || value <= until),
          );

          return (
            !existingSince ||
            createError({
              path,
              message: t('price_list_article.error.price_period_date'),
            })
          );
        }),
      until: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('price_list_article.field.date_until', language, t))
        .max(MAX_DATE, getDateMaxTranslation('price_list_article.field.date_until', language, t))
        .when('since', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('since'),
              getDateNotBeforeTranslation(
                'price_list_article.field.date_until',
                'price_list_article.field.date_since',
                t,
              ),
            ),
        })
        .test('validUntil', function (value) {
          const { createError, path } = this;

          if (value === null || value === undefined) {
            const existingUntil = pricePeriods.find(({ until }) => until === null);

            return (
              !existingUntil ||
              createError({
                path,
                message: t('price_list_article.error.price_period_date_until'),
              })
            );
          }

          const existingUntil = pricePeriods.find(
            ({ since, until }) => since && until && value >= since && value <= until,
          );

          return (
            !existingUntil ||
            createError({
              path,
              message: t('price_list_article.error.price_period_date'),
            })
          );
        }),
      price: number().required(getRequiredTranslation('price_list_article.field.price', t)),
    },
    [['since', 'until']],
  );

export const getPriceListArticlePricePeriodsSchema = (language: string, mode: FormMode, t: TFunction) =>
  object().shape({
    pricePeriods: array()
      .min(mode === FormMode.Create ? 0 : 1, t('price_list_article.error.no_price_periods'))
      .of(getPriceListArticlePricePeriodSchema(language, [], t)),
  });

export const getPriceListArticleGeneralDataSchema = (
  canUseInternalCode: boolean,
  language: string,
  mode: FormMode,
  t: TFunction,
) =>
  object()
    .shape({
      priceList: object().required(getRequiredTranslation('price_list_article.field.price_list', t)),
      internalCode: string()
        .required(getRequiredTranslation('price_list_article.field.internal_code', t))
        .valid(canUseInternalCode, t('price_list_article.error.internal_code')),
      name: string().required(getRequiredTranslation('price_list_article.field.name', t)),
      since: date()
        .nullable()
        .requiredIf(mode === FormMode.Create, getRequiredTranslation('price_list_article.field.date_since', t))
        .min(MIN_DATE, getDateMinTranslation('price_list_article.field.date_since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('price_list_article.field.date_since', language, t)),
      measurementUnit: object().required(getRequiredTranslation('price_list_article.field.measurement_unit', t)),
      price: number()
        .nullable()
        .requiredIf(mode === FormMode.Create, getRequiredTranslation('price_list_article.field.price', t)),
    })
    .concat(getPriceListArticlePricePeriodsSchema(language, mode, t));
