import { EditTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFieldValue } from '../../../../interfaces/FieldValues/EstateUnitGroup';
import { EstateUnitGroupField } from '../../../core/Fields/EstateUnitGroup/EstateUnitGroup';
import { EstateUnitsDialog } from './Dialog/Dialog';
import { FacilityContractEstateUnitsProps } from './EstateUnits.types';
import { FacilityContractEstateUnitsTable } from './Table/Table';
import { FacilityContractEstateUnitsTransferList } from './TransferList/TransferList';

export const FacilityContractEstateUnits = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: FacilityContractEstateUnitsProps) => {
  const { t } = useTranslation();
  const estateUnitGroup = useWatch({ control, name: 'originalEstateUnitGroup' });
  const [isCatalogueTypesDialogOpen, setCatalogueTypesDialogOpen] = useState(false);
  const { fields, replace } = useFieldArray({
    control,
    name: 'estateUnits',
  });

  const handleEstateUnitGroupChange = useCallback(
    (onChange: (value: EstateUnitGroupFieldValue | null) => void) => (value: EstateUnitGroupFieldValue | null) => {
      onChange(value);

      setValue('estateUnits', [] as EstateUnitFragment[]);
    },
    [setValue],
  );

  const handleEditEstateUnits = useCallback(() => {
    setCatalogueTypesDialogOpen(true);
  }, []);
  const handleCloseEstateUnitsDialog = useCallback(() => {
    setCatalogueTypesDialogOpen(false);
  }, []);
  const handleSaveEstateUnits = useCallback(
    (estateUnits: EstateUnitFragment[]) => {
      replace(estateUnits);
      handleCloseEstateUnitsDialog();
    },
    [replace, handleCloseEstateUnitsDialog],
  );
  const handleRemoveEstateUnits = useCallback(
    (estateUnits: EstateUnitFragment[]) => {
      const ids = estateUnits.map(({ id }) => id);
      const filteredEstateUnits = fields.filter(({ id }) => !ids.includes(id));
      replace(filteredEstateUnits);
    },
    [fields, replace],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      <SectionTitle value="facility_contract.section_title.estate_unit_group" />
      <Grid2 size={12}>
        <Controller
          name="originalEstateUnitGroup"
          control={control}
          render={({ field }) => (
            <EstateUnitGroupField
              {...field}
              onChange={handleEstateUnitGroupChange(field.onChange)}
              label={t('facility_contract.field.estate_unit_group')}
              error={!!errors.originalEstateUnitGroup}
              helperText={errors.originalEstateUnitGroup?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {isCatalogueTypesDialogOpen && (
        <EstateUnitsDialog
          estateUnits={fields}
          estateUnitGroup={estateUnitGroup}
          onClose={handleCloseEstateUnitsDialog}
          onSave={handleSaveEstateUnits}
        />
      )}
      <SectionTitle
        actions={
          mode === FormMode.Create || readonly ? undefined : (
            <Button color="secondary" variant="contained" startIcon={<EditTwoTone />} onClick={handleEditEstateUnits}>
              {t('facility_contract.action.add_estate_units')}
            </Button>
          )
        }
        value="facility_contract.section_title.estate_units"
      />
      {mode === FormMode.Edit && errors.catalogueTypes?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.catalogueTypes.message} />
        </Grid2>
      )}
      <Grid2
        size={12}
        sx={mode === FormMode.Create ? { height: { xs: 'calc(100% - 144px)', sm: 'calc(100% - 168px)' } } : undefined}
      >
        {mode === FormMode.Create ? (
          <FacilityContractEstateUnitsTransferList control={control} />
        ) : (
          <FacilityContractEstateUnitsTable
            estateUnits={fields}
            onDelete={readonly ? undefined : handleRemoveEstateUnits}
          />
        )}
      </Grid2>
    </Grid2>
  );
};
