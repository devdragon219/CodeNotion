import { TFunction } from 'i18next';
import { array, date, object, ref, string } from 'yup';

import { MAX_DATE, MIN_DATE } from '../../../configs/dates';
import { EntryStatus } from '../../../gql/types';
import { DocumentFieldConfig } from '../../../interfaces/DocumentField';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '../../translationUtils';

interface DocumentSchemaOptions {
  fieldsConfig?: DocumentFieldConfig[];
  entryStatus?: EntryStatus | null;
  existingDocumentNames?: string[];
}

export const getDocumentSchema = (language: string, t: TFunction, options?: DocumentSchemaOptions) => {
  const fieldsConfig = options?.fieldsConfig ?? [];
  const entryStatus = options?.entryStatus ?? null;

  const nameFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'name');
  const protocolNumberFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'protocolNumber');
  const sinceFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'since');
  const untilFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'until');
  const issuerFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'issuer');
  const issueDateFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'issueDate');
  const contentCategoryGroupFieldConfig = fieldsConfig.find(
    (fieldConfig) => fieldConfig.fieldName === 'contentCategoryGroup',
  );
  const contentCategoryFieldConfig = fieldsConfig.find((fieldConfig) => fieldConfig.fieldName === 'contentCategory');

  return object().shape(
    {
      name: string().requiredIf(
        !!nameFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
        getRequiredTranslation(nameFieldConfig?.label ?? 'common.component.document_field.field.document_name', t),
      ),
      protocolNumber: string().requiredIf(
        !!protocolNumberFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
        getRequiredTranslation(
          protocolNumberFieldConfig?.label ?? 'common.component.document_field.field.protocol_number',
          t,
        ),
      ),
      since: date()
        .nullable()
        .requiredIf(
          !!sinceFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
          getRequiredTranslation(sinceFieldConfig?.label ?? 'common.component.document_field.field.valid_since', t),
        )
        .min(
          MIN_DATE,
          getDateMinTranslation(
            sinceFieldConfig?.label ?? 'common.component.document_field.field.valid_since',
            language,
            t,
          ),
        )
        .max(
          MAX_DATE,
          getDateMaxTranslation(
            sinceFieldConfig?.label ?? 'common.component.document_field.field.valid_since',
            language,
            t,
          ),
        )
        .when('until', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('until'),
              getDateNotAfterTranslation(
                sinceFieldConfig?.label ?? 'common.component.document_field.field.valid_since',
                untilFieldConfig?.label ?? 'common.component.document_field.field.valid_until',
                t,
              ),
            ),
        }),
      until: date()
        .nullable()
        .requiredIf(
          !!untilFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
          getRequiredTranslation(untilFieldConfig?.label ?? 'common.component.document_field.field.valid_until', t),
        )
        .min(
          MIN_DATE,
          getDateMinTranslation(
            untilFieldConfig?.label ?? 'common.component.document_field.field.valid_until',
            language,
            t,
          ),
        )
        .max(
          MAX_DATE,
          getDateMaxTranslation(
            untilFieldConfig?.label ?? 'common.component.document_field.field.valid_until',
            language,
            t,
          ),
        )
        .when('since', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('since'),
              getDateNotBeforeTranslation(
                untilFieldConfig?.label ?? 'common.component.document_field.field.valid_until',
                sinceFieldConfig?.label ?? 'common.component.document_field.field.valid_since',
                t,
              ),
            ),
        }),
      issuer: string().requiredIf(
        !!issuerFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
        getRequiredTranslation(issuerFieldConfig?.label ?? 'common.component.document_field.field.issuer', t),
      ),
      issueDate: date()
        .nullable()
        .requiredIf(
          !!issueDateFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
          getRequiredTranslation(issueDateFieldConfig?.label ?? 'common.component.document_field.field.issue_date', t),
        )
        .min(
          MIN_DATE,
          getDateMinTranslation(
            issueDateFieldConfig?.label ?? 'common.component.document_field.field.issue_date',
            language,
            t,
          ),
        )
        .max(
          MAX_DATE,
          getDateMaxTranslation(
            issueDateFieldConfig?.label ?? 'common.component.document_field.field.issue_date',
            language,
            t,
          ),
        ),
      contentCategoryGroup: string()
        .nullable()
        .requiredIf(
          !!contentCategoryGroupFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
          getRequiredTranslation(
            contentCategoryGroupFieldConfig?.label ?? 'common.component.document_field.field.content_category_group',
            t,
          ),
        ),
      contentCategory: string()
        .nullable()
        .requiredIf(
          !!contentCategoryFieldConfig?.required && entryStatus !== EntryStatus.IncompleteDraft,
          getRequiredTranslation(
            contentCategoryFieldConfig?.label ?? 'common.component.document_field.field.content_category',
            t,
          ),
        ),
      fileName: string().required(t('common.error.required_upload')),
    },
    [['since', 'until']],
  );
};

export const getArrayDocumentsSchema = (language: string, t: TFunction, options?: DocumentSchemaOptions) =>
  array().of(
    getDocumentSchema(language, t, options).unique(
      'name',
      options?.existingDocumentNames ?? [],
      t('common.component.document_field.error.duplicate_name'),
    ),
  );

export const getDocumentsSchema = (language: string, t: TFunction, options?: DocumentSchemaOptions) =>
  object().shape({
    documents: getArrayDocumentsSchema(language, t, options),
  });
