import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref, string } from 'yup';

import { getTicketCatalogueItemsSchema } from './catalogueItems';

export const getTicketGeneralDataSchema = (
  canUseInternalCode: boolean,
  language: string,
  mode: FormMode,
  t: TFunction,
  isSupplier = false,
) =>
  object()
    .shape(
      {
        internalCode: string().when('mainType', ([mainType], schema) => {
          if (mainType === TicketMainType.Issue || mode === FormMode.Edit) {
            return schema
              .required(
                getRequiredTranslation(
                  `ticket.field.${mainType === TicketMainType.Issue ? 'issue' : 'on_condition'}_ticket_code`,
                  t,
                ),
              )
              .valid(canUseInternalCode, t('ticket.error.ticket_code'));
          }
          return schema;
        }),
        masterStatus: string().when('mainType', ([mainType], schema) => {
          if (mainType === TicketMainType.Issue || mode === FormMode.Edit) {
            return schema.required(
              getRequiredTranslation(
                `ticket.field.${mainType === TicketMainType.Issue ? 'issue' : 'on_condition'}_ticket_status`,
                t,
              ),
            );
          }
          return schema;
        }),
        requestor: string().when('mainType', {
          is: (mainType: TicketMainType) => mainType === TicketMainType.Issue,
          then: (schema) => schema.required(getRequiredTranslation('ticket.field.requestor', t)),
        }),
        requestDateTime: date()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('ticket.field.request_date', t))
                .min(MIN_DATE, getDateMinTranslation('ticket.field.request_date', language, t))
                .max(MAX_DATE, getDateMaxTranslation('ticket.field.request_date', language, t))
                .when('dueDate', {
                  is: (value: Date | null) => value !== null,
                  then: (schema) =>
                    schema.max(
                      ref('dueDate'),
                      getDateNotAfterTranslation('ticket.field.request_date', 'ticket.field.due_date', t),
                    ),
                }),
          }),
        dueDate: date()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue || mode === FormMode.Edit,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('ticket.field.due_date', t))
                .min(MIN_DATE, getDateMinTranslation('ticket.field.due_date', language, t))
                .max(MAX_DATE, getDateMaxTranslation('ticket.field.due_date', language, t))
                .when(['mainType', 'requestDateTime'], {
                  is: (mainType: TicketMainType | null, value: Date | null) =>
                    mainType === TicketMainType.Issue && value !== null,
                  then: (schema) =>
                    schema.min(
                      ref('requestDateTime'),
                      getDateNotBeforeTranslation('ticket.field.due_date', 'ticket.field.request_date', t),
                    ),
                }),
          }),
        customType: object()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.ticket_type', t)),
          }),
        priority: string()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.priority', t)),
          }),
        catalogueCategory: object()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue || mode === FormMode.Edit,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.catalogue_category', t)),
          }),
        catalogueSubCategory: object()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue || mode === FormMode.Edit,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.catalogue_subcategory', t)),
          }),
        catalogueType: object()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue || mode === FormMode.Edit,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.catalogue_type', t)),
          }),
        supplierSubject: object()
          .nullable()
          .when('mainType', {
            is: (mainType: TicketMainType) => mainType === TicketMainType.Issue || mode === FormMode.Edit,
            then: (schema) => schema.required(getRequiredTranslation('ticket.field.supplier_subject', t)),
          }),
        plannedTeam: object()
          .nullable()
          .when(['mainType', 'masterStatus'], {
            is: (mainType: TicketMainType, status: TicketMasterStatus) =>
              status === TicketMasterStatus.Assigned && (mainType === TicketMainType.Issue || mode === FormMode.Edit),
            then: (schema) => schema.requiredIf(isSupplier, getRequiredTranslation('ticket.field.work_team', t)),
          }),
        plannedTeamLeaderUser: object()
          .nullable()
          .when(['mainType', 'masterStatus'], {
            is: (mainType: TicketMainType, status: TicketMasterStatus) =>
              status === TicketMasterStatus.Assigned && (mainType === TicketMainType.Issue || mode === FormMode.Edit),
            then: (schema) => schema.requiredIf(isSupplier, getRequiredTranslation('ticket.field.leader_user', t)),
          }),
      },
      [['requestDateTime', 'dueDate']],
    )
    .concat(getTicketCatalogueItemsSchema(t));
