import { EqualityOperator, PenaltyType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { ConditionType } from '../../../../enums/ConditionType';
import { getEmptyConditionsBuilderFormInput, getEmptyGroupConditionsFormInput } from '../initialValues';
import { getConditionsBuilderSchema } from './conditionsBuilder';

describe('conditions-builder.conditions-schema', () => {
  const schema = getConditionsBuilderSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyConditionsBuilderFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
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
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});
