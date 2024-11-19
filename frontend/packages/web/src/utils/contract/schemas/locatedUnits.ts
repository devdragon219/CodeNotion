import { TFunction } from 'i18next';
import { array, boolean, object } from 'yup';

export const getContractLocatedUnitsSchema = (isContractActive: boolean, validateAll: boolean, t: TFunction) =>
  object().shape({
    locatedUnits: array()
      .min(1, t(`contract.error.no_estate${isContractActive ? '_sub_' : '_'}units`))
      .of(
        object().shape({
          isMainUnit: boolean(),
        }),
      )
      .test('validLocatedUnits', function (value) {
        if (!validateAll) {
          return true;
        }

        const { createError, path } = this;
        const mainUnits = (value ?? []).filter((locatedUnit) => locatedUnit.isMainUnit);
        const message =
          mainUnits.length === 0
            ? t('contract.error.no_main_unit')
            : mainUnits.length > 1
              ? t('contract.error.multiple_main_units')
              : undefined;
        return !message || createError({ path, message });
      }),
  });
