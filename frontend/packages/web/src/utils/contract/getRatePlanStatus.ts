import { RatePlanStatus } from '../../enums/RatePlanStatus';

export const getRatePlanStatus = (isDeclarationExpected: boolean, isDeclared: boolean): RatePlanStatus => {
  if (!isDeclarationExpected) {
    return RatePlanStatus.NotExpected;
  }

  if (!isDeclared) {
    return RatePlanStatus.Waiting;
  }

  return RatePlanStatus.Declared;
};
