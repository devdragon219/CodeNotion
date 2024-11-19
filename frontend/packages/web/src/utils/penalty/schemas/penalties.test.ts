import { EqualityOperator, PenaltyType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { ConditionType } from '../../../enums/ConditionType';
import { getEmptyGroupConditionsFormInput } from '../../components/conditionsBuilder/initialValues';
import { getEmptyPenaltyFormInput } from '../initialValues';
import { getPenaltiesSchema } from './penalties';

describe('penalty.penalties-schema', () => {
  const schema = getPenaltiesSchema({}, mockTFunction);

  it('should fail', () => {
    const input = {
      penalties: [getEmptyPenaltyFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      penalties: [
        {
          ...getEmptyPenaltyFormInput(),
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
                conditionType: ConditionType.PenaltyType,
                penaltyType: PenaltyType.Fixed,
                penaltyValue: 0,
              },
            ]),
          },
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
