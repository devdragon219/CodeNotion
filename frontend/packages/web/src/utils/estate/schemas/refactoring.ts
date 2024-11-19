import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { getEstateRefactoringEstateUnitsSchema } from './refactoringEstateUnits';
import { getEstateRefactoringGeneralDataSchema } from './refactoringGeneralData';

export const getEstateRefactoringsSchema = (t: TFunction) =>
  object().shape({
    refactorings: array().of(getEstateRefactoringGeneralDataSchema(t).concat(getEstateRefactoringEstateUnitsSchema(t))),
  });
