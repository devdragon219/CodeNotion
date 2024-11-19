import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getTicketFacilityContractSchema = (t: TFunction) =>
  object().shape({
    facilityContract: object()
      .nullable()
      .when('mainType', {
        is: TicketMainType.ChecklistOnTriggerCondition,
        then: (schema) => schema.required(t('ticket.error.no_facility_contract_selected')),
      }),
  });
