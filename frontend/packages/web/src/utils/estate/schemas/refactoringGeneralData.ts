import { MAX_YEAR, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { getRequiredTranslation, getYearMaxTranslation, getYearMinTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getEstateRefactoringGeneralDataSchema = (t: TFunction) =>
  object().shape({
    referenceYear: number()
      .required(getRequiredTranslation('estate.field.refactoring_year', t))
      .min(MIN_YEAR, getYearMinTranslation('estate.field.refactoring_year', t))
      .max(MAX_YEAR, getYearMaxTranslation('estate.field.refactoring_year', t)),
    buildingPermitYear: number()
      .nullable()
      .min(MIN_YEAR, getYearMinTranslation('estate.field.refactoring_condition', t))
      .max(MAX_YEAR, getYearMaxTranslation('estate.field.refactoring_condition', t)),
    condition: string().required(getRequiredTranslation('estate.field.refactoring_condition', t)),
  });
