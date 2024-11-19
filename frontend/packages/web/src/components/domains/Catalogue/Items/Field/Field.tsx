import { Divider, Grid2 } from '@mui/material';
import { DateField, FormViewer, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCatalogueItem } from '../../../../../hooks/useCatalogueItem';
import { ItemFieldProps } from './Field.types';

export const ItemField = ({
  control,
  errors,
  existingInternalCodes = [],
  index,
  internalCodes,
  mode,
  useGetInternalCode,
  setCanUseInternalCodes,
  setValue,
}: ItemFieldProps) => {
  const { t } = useTranslation();
  const { checkCanUseInternalCode, getInternalCode } = useCatalogueItem();
  const status = useWatch({ control, name: `items.${index}.status` });
  const catalogueItemId = useWatch({ control, name: `items.${index}.catalogueItemId` });
  const guid = useWatch({ control, name: `items.${index}.guid` });
  const internalCode = useWatch({ control, name: `items.${index}.internalCode` });
  const fields = useWatch({ control, name: `items.${index}.fields` });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedCatalogueItemId = useDebounce(catalogueItemId);
  const additionallyOccupiedCodes = useMemo(
    () =>
      [...existingInternalCodes, ...internalCodes.filter((_, idx) => idx !== index)].filter(
        (internalCode) => internalCode.length !== 0,
      ),
    [existingInternalCodes, index, internalCodes],
  );
  const debouncedAdditionallyOccupiedCodes = useDebounce(additionallyOccupiedCodes);

  useEffect(() => {
    if (useGetInternalCode) {
      getInternalCode(additionallyOccupiedCodes, (internalCode) => {
        setValue(`items.${index}.internalCode`, internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedInternalCode,
      debouncedCatalogueItemId,
      debouncedAdditionallyOccupiedCodes,
      (canUseInternalCode) => {
        setCanUseInternalCodes((canUseInternalCodes) => ({
          ...canUseInternalCodes,
          [guid]: canUseInternalCode,
        }));
      },
    );
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedCatalogueItemId, debouncedAdditionallyOccupiedCodes.length]);

  useEffect(() => {
    if (status !== EstateStatus.Decommissioned) {
      setValue(`items.${index}.decommissioningDate`, null);
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`items.${index}.internalCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue.field.catalogue_item_code')}
              error={!!errors.items?.[index]?.internalCode}
              helperText={errors.items?.[index]?.internalCode?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`items.${index}.status`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('catalogue.field.catalogue_item_status')}
              options={Object.values(EstateStatus)}
              getOptionLabel={(option) => t(`common.enum.estate_status.${option}`)}
              error={!!errors.items?.[index]?.status}
              helperText={errors.items?.[index]?.status?.message}
              disabled={mode === FormMode.Create}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name={`items.${index}.activationDate`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('catalogue.field.catalogue_item_activation_date')}
              error={!!errors.items?.[index]?.activationDate}
              helperText={errors.items?.[index]?.activationDate?.message}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name={`items.${index}.decommissioningDate`}
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('catalogue.field.catalogue_item_decommissioning_date')}
                error={!!errors.items?.[index]?.decommissioningDate}
                helperText={errors.items?.[index]?.decommissioningDate?.message}
                required={status === EstateStatus.Decommissioned}
                disabled={status !== EstateStatus.Decommissioned}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name={`items.${index}.lastMaintenanceDate`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('catalogue.field.catalogue_item_last_maintenance_date')}
              error={!!errors.items?.[index]?.lastMaintenanceDate}
              helperText={errors.items?.[index]?.lastMaintenanceDate?.message}
              required
            />
          )}
        />
      </Grid2>
      {fields.length !== 0 && (
        <>
          <Grid2 size={12}>
            <Divider />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name={`items.${index}.fields`}
              control={control}
              render={({ field }) => <FormViewer {...field} errors={errors.items?.[index]} />}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
