import { ParseKeys, TFunction, TOptions } from 'i18next';

import { MAX_DATE, MAX_YEAR, MIN_DATE, MIN_YEAR } from '../configs/dates';
import { DocumentFormInput } from '../interfaces/FormInputs/Document';
import { parseDateToLocalizedString } from './dateUtils';

export const getDateMaxTranslation = (field: ParseKeys, language: string, t: TFunction, max = MAX_DATE) =>
  t('common.error.max', {
    name: t(field),
    max: parseDateToLocalizedString(max, language),
  });

export const getDateMinTranslation = (field: ParseKeys, language: string, t: TFunction, min = MIN_DATE) =>
  t('common.error.min', {
    name: t(field),
    min: parseDateToLocalizedString(min, language),
  });

export const getDateNotAfterTranslation = (first: ParseKeys, second: ParseKeys, t: TFunction) =>
  t('common.error.date_not_after', {
    first: t(first),
    second: t(second),
  });

export const getDateNotBeforeTranslation = (first: ParseKeys, second: ParseKeys, t: TFunction) =>
  t('common.error.date_not_before', {
    first: t(first),
    second: t(second),
  });

export const getDateNotFutureTranslation = (field: ParseKeys, t: TFunction) =>
  t('common.error.date_not_future', { name: t(field) });

export const getNumberNotGreaterTranslation = (first: ParseKeys, second: ParseKeys, t: TFunction) =>
  t('common.error.number_not_greater', {
    first: t(first),
    second: t(second),
  });

export const getNumberNotLesserTranslation = (first: ParseKeys, second: ParseKeys, t: TFunction) =>
  t('common.error.number_not_less', {
    first: t(first),
    second: t(second),
  });

export const getNumberMaxTranslation = (field: ParseKeys, max: number, t: TFunction) =>
  t('common.error.max', {
    name: t(field),
    max,
  });

export const getPercentMaxTranslation = (field: ParseKeys, t: TFunction) =>
  t('common.error.max', {
    name: t(field),
    max: 100,
  });

export const getRequiredTranslation = (field: ParseKeys, t: TFunction, options?: TOptions) =>
  t('common.error.required', {
    name: t(field, options),
  });

export const getYearMaxTranslation = (field: ParseKeys, t: TFunction, max = MAX_YEAR) =>
  t('common.error.max', {
    name: t(field),
    max,
  });

export const getYearMinTranslation = (field: ParseKeys, t: TFunction, min = MIN_YEAR) =>
  t('common.error.min', {
    name: t(field),
    min,
  });

export const getDocumentUploadTranslation = (documents: DocumentFormInput[], t: TFunction) =>
  t(`common.feedback.document${documents.length === 1 ? '' : 's'}_upload`);

export const getDocumentUploadedTranslation = (documents: DocumentFormInput[], t: TFunction) =>
  t(`common.feedback.document${documents.length === 1 ? '' : 's'}_uploaded`);
