import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref } from 'yup';

import { getWorkersSchema } from '../../components/worker/schemas/workers';

export const getTicketResolutionSchema = (language: string, t: TFunction, isSupplier = false) =>
  object()
    .shape({
      resolution: object().when('masterStatus', {
        is: (status: TicketMasterStatus) => status === TicketMasterStatus.Resolved,
        then: (schema) =>
          isSupplier
            ? schema.shape(
                {
                  interventionStart: date()
                    .required(getRequiredTranslation('ticket.field.resolution_start_date', t))
                    .min(MIN_DATE, getDateMinTranslation('ticket.field.resolution_start_date', language, t))
                    .max(MAX_DATE, getDateMaxTranslation('ticket.field.resolution_start_date', language, t))
                    .when('interventionEnd', {
                      is: (value: Date | null) => value !== null,
                      then: (schema) =>
                        schema.max(
                          ref('interventionEnd'),
                          getDateNotAfterTranslation(
                            'ticket.field.resolution_start_date',
                            'ticket.field.resolution_end_date',
                            t,
                          ),
                        ),
                    }),
                  interventionEnd: date()
                    .required(getRequiredTranslation('ticket.field.resolution_end_date', t))
                    .min(MIN_DATE, getDateMinTranslation('ticket.field.resolution_end_date', language, t))
                    .max(MAX_DATE, getDateMaxTranslation('ticket.field.resolution_end_date', language, t))
                    .when(['interventionStart', 'closure'], ([interventionStart, closure], schema) => {
                      if (interventionStart && !closure) {
                        return schema.min(
                          interventionStart,
                          getDateNotBeforeTranslation(
                            'ticket.field.resolution_end_date',
                            'ticket.field.resolution_start_date',
                            t,
                          ),
                        );
                      } else if (!interventionStart && closure) {
                        return schema.max(
                          closure,
                          getDateNotAfterTranslation(
                            'ticket.field.resolution_end_date',
                            'ticket.field.resolution_closure_date',
                            t,
                          ),
                        );
                      } else if (interventionStart && closure) {
                        return schema
                          .min(
                            interventionStart,
                            getDateNotBeforeTranslation(
                              'ticket.field.resolution_end_date',
                              'ticket.field.resolution_start_date',
                              t,
                            ),
                          )
                          .max(
                            closure,
                            getDateNotAfterTranslation(
                              'ticket.field.resolution_end_date',
                              'ticket.field.resolution_closure_date',
                              t,
                            ),
                          );
                      }
                      return schema;
                    }),
                  closure: date()
                    .required(getRequiredTranslation('ticket.field.resolution_closure_date', t))
                    .min(MIN_DATE, getDateMinTranslation('ticket.field.resolution_closure_date', language, t))
                    .max(MAX_DATE, getDateMaxTranslation('ticket.field.resolution_closure_date', language, t))
                    .when('interventionEnd', {
                      is: (value: Date | null) => value !== null,
                      then: (schema) =>
                        schema.min(
                          ref('interventionEnd'),
                          getDateNotBeforeTranslation(
                            'ticket.field.resolution_closure_date',
                            'ticket.field.resolution_end_date',
                            t,
                          ),
                        ),
                    }),
                },
                [
                  ['interventionStart', 'interventionEnd'],
                  ['interventionEnd', 'closure'],
                ],
              )
            : schema,
      }),
    })
    .concat(getWorkersSchema(language, t));
