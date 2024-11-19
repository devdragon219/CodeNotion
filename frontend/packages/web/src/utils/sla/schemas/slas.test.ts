import { EqualityOperator } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { ConditionType } from '../../../enums/ConditionType';
import { getEmptyGroupConditionsFormInput } from '../../components/conditionsBuilder/initialValues';
import { getEmptySlaFormInput } from '../initialValues';
import { getSlasSchema } from './slas';

describe('sla.slas-schema', () => {
  const schema = getSlasSchema({}, mockTFunction);

  it('should fail', () => {
    const input = {
      slas: [getEmptySlaFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      slas: [
        {
          ...getEmptySlaFormInput(),
          internalCode: 'internalCode',
          description: 'description',
          conditions: {
            ifCondition: getEmptyGroupConditionsFormInput([
              {
                conditionId: null,
                conditionType: ConditionType.TicketType,
                operator: EqualityOperator.Equal,
                ticketType: {
                  description: 'description',
                  id: 0,
                },
              },
            ]),
            thenCondition: getEmptyGroupConditionsFormInput([
              {
                conditionId: null,
                conditionType: ConditionType.TicketType,
                operator: EqualityOperator.Equal,
                ticketType: {
                  description: 'description',
                  id: 0,
                },
              },
            ]),
          },
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
