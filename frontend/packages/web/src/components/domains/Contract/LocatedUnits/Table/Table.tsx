import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, CheckboxField, SecondaryTable, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractLocatedUnitFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { parseAddressToString } from '../../../../../utils/addressUtils';
import { ContractLocatedUnitCreateDialog } from '../../../../wizards/ContractLocatedUnit/ContractLocatedUnit';
import { ContractLocatedUnitsTableProps } from './Table.types';

export const ContractLocatedUnitsTable = ({
  control,
  errors,
  isContractActive,
  mode,
  readonly,
}: ContractLocatedUnitsTableProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isLocatedUnitDialogOpen, setLocatedUnitDialogOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({ control, name: 'locatedUnits' });

  const handleAddLocatedUnit = useCallback(() => {
    setLocatedUnitDialogOpen(true);
  }, []);
  const handleCloseLocatedUnitDialog = useCallback(() => {
    setLocatedUnitDialogOpen(false);
  }, []);
  const handleSaveLocatedUnits = useCallback(
    (locatedUnits: ContractLocatedUnitFormInput[]) => {
      append(locatedUnits);
      handleCloseLocatedUnitDialog();
    },
    [append, handleCloseLocatedUnitDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errors.locatedUnits?.root?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.locatedUnits.root.message} />
        </Grid2>
      )}
      {mode === FormMode.Edit && (
        <SectionTitle
          actions={
            !readonly ? (
              <Button
                color="secondary"
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddLocatedUnit}
              >
                {t(`contract.action.add_estate${isContractActive ? '_sub_' : '_'}unit`)}
              </Button>
            ) : undefined
          }
          value={`contract.tab.estate${isContractActive ? '_sub_' : '_'}units`}
        />
      )}
      {isLocatedUnitDialogOpen && (
        <ContractLocatedUnitCreateDialog
          currentLocatedUnits={fields}
          isActive={isContractActive}
          onClose={handleCloseLocatedUnitDialog}
          onSave={handleSaveLocatedUnits}
        />
      )}
      <Grid2 size={12} sx={{ overflowX: 'auto' }}>
        <SecondaryTable
          columns={[
            `contract.field.located_unit_estate${isContractActive ? '_sub_' : '_'}unit_code`,
            'contract.field.located_unit_estate_unit_name',
            'contract.field.located_unit_estate_unit_address',
            'contract.field.located_unit_main_unit',
            'contract.field.located_unit_registry_update',
            'contract.field.located_unit_partial_location',
            'contract.field.located_unit_surface',
            'contract.field.located_unit_ancillary_unit',
            'contract.field.located_unit_registration_in_progress',
          ]}
          rows={fields.map((entry, index) => [
            isContractActive ? entry.estateSubUnit?.internalCode : entry.estateUnit?.internalCode,
            isContractActive ? entry.estateSubUnit?.estateUnit.name : entry.estateUnit?.name,
            isContractActive
              ? parseAddressToString(entry.estateSubUnit?.estateUnit.address, language)
              : parseAddressToString(entry.estateUnit?.address, language),
            <Controller
              key={`locatedUnits.${index}.isMainUnit`}
              name={`locatedUnits.${index}.isMainUnit`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.locatedUnits?.[index]?.isMainUnit}
                  helperText={errors.locatedUnits?.[index]?.isMainUnit?.message}
                  readonly={readonly}
                />
              )}
            />,
            <Controller
              key={`locatedUnits.${index}.isRegistryUpdateEnabled`}
              name={`locatedUnits.${index}.isRegistryUpdateEnabled`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.locatedUnits?.[index]?.isRegistryUpdateEnabled}
                  helperText={errors.locatedUnits?.[index]?.isRegistryUpdateEnabled?.message}
                  readonly={readonly}
                />
              )}
            />,
            <Controller
              key={`locatedUnits.${index}.isPartialLocation`}
              name={`locatedUnits.${index}.isPartialLocation`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.locatedUnits?.[index]?.isPartialLocation}
                  helperText={errors.locatedUnits?.[index]?.isPartialLocation?.message}
                  readonly={readonly}
                />
              )}
            />,
            <Controller
              key={`locatedUnits.${index}.surfaceSqM`}
              name={`locatedUnits.${index}.surfaceSqM`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  sx={{ minWidth: '100px' }}
                  placeholder={t('contract.field.located_unit_surface_placeholder')}
                  error={!!errors.locatedUnits?.[index]?.surfaceSqM}
                  helperText={errors.locatedUnits?.[index]?.surfaceSqM?.message}
                  readonly={readonly}
                />
              )}
            />,
            <Controller
              key={`locatedUnits.${index}.isAncillaryUnit`}
              name={`locatedUnits.${index}.isAncillaryUnit`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.locatedUnits?.[index]?.isAncillaryUnit}
                  helperText={errors.locatedUnits?.[index]?.isAncillaryUnit?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />,
            <Controller
              key={`locatedUnits.${index}.isCadastralRegistrationInProgress`}
              name={`locatedUnits.${index}.isCadastralRegistrationInProgress`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.locatedUnits?.[index]?.isCadastralRegistrationInProgress}
                  helperText={errors.locatedUnits?.[index]?.isCadastralRegistrationInProgress?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />,
          ])}
          onRowDelete={!readonly && mode === FormMode.Edit ? remove : undefined}
        />
      </Grid2>
    </Grid2>
  );
};
