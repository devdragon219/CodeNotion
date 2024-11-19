import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCatalogueSubCategory } from '../../../../../hooks/useCatalogueSubcategory';
import { SubCategoryFieldProps } from './Field.types';

export const SubCategoryField = ({
  control,
  errors,
  existingInternalCodes = [],
  index,
  internalCodes,
  mode,
  setCanUseInternalCodes,
  setValue,
}: SubCategoryFieldProps) => {
  const { t } = useTranslation();
  const { checkCanUseInternalCode, getInternalCode } = useCatalogueSubCategory();
  const categoryId = useWatch({ control, name: 'categoryId' });
  const categoryInternalCode = useWatch({ control, name: 'internalCode' });
  const internalCode = useWatch({ control, name: `subCategories.${index}.internalCode` });
  const subCategoryId = useWatch({ control, name: `subCategories.${index}.subCategoryId` });
  const guid = useWatch({ control, name: `subCategories.${index}.guid` });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedCategoryId = useDebounce(categoryId);
  const debouncedSubCategoryId = useDebounce(subCategoryId);
  const additionallyOccupiedCodes = useMemo(
    () =>
      [...existingInternalCodes, ...internalCodes.filter((_, idx) => idx !== index)].filter(
        (internalCode) => internalCode.length !== 0,
      ),
    [existingInternalCodes, index, internalCodes],
  );
  const debouncedAdditionallyOccupiedCodes = useDebounce(additionallyOccupiedCodes);

  useEffect(() => {
    if (mode === FormMode.Create) {
      getInternalCode(categoryInternalCode, additionallyOccupiedCodes, (internalCode) => {
        setValue(`subCategories.${index}.internalCode`, internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedInternalCode,
      debouncedCategoryId,
      debouncedSubCategoryId,
      debouncedAdditionallyOccupiedCodes,
      (canUseInternalCode) => {
        setCanUseInternalCodes((canUseInternalCodes) => ({
          ...canUseInternalCodes,
          [guid]: canUseInternalCode,
        }));
      },
    );
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedCategoryId, debouncedAdditionallyOccupiedCodes.length]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`subCategories.${index}.internalCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('service_category.field.internal_code')}
              error={!!errors.subCategories?.[index]?.internalCode}
              helperText={errors.subCategories?.[index]?.internalCode?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`subCategories.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('service_category.field.name')}
              error={!!errors.subCategories?.[index]?.name}
              helperText={errors.subCategories?.[index]?.name?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
