import { Grid2 } from '@mui/material';
import { Alert, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { UtilityServiceEstateUnitsDialog } from './Dialog/Dialog';
import { UtilityServiceEstateUnitsProps } from './EstateUnits.types';

export const UtilityServiceEstateUnits = ({ control, errors, readonly, setValue }: UtilityServiceEstateUnitsProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();
  const estates = useWatch({ control, name: 'estates' });
  const estateUnits = useWatch({ control, name: 'estateUnits' });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleAdd = useCallback(
    (utilityService: UtilityServiceFormInput) => {
      setValue('estateUnits', [...estateUnits, ...utilityService.estateUnits]);
      handleCloseDialog();
    },
    [estateUnits, handleCloseDialog, setValue],
  );

  const handleDelete = useCallback(
    (
      rows: UtilityServiceFormInput['estateUnits'][number] | UtilityServiceFormInput['estateUnits'],
      onComplete: () => void,
    ) => {
      const ids = Array.isArray(rows) ? rows.map(({ id }) => id) : [rows.id];
      setValue(
        'estateUnits',
        estateUnits.filter(({ id }) => !ids.includes(id)),
      );
      onComplete();
    },
    [estateUnits, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isDialogOpen && (
        <UtilityServiceEstateUnitsDialog
          currentEstates={estates}
          currentEstateUnits={estateUnits}
          onClose={handleCloseDialog}
          onSave={handleAdd}
        />
      )}
      {errors.estateUnits?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.estateUnits.message} />
        </Grid2>
      )}
      <SectionTitle value="utility_service.section_title.estate_units" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={[
            {
              id: 'internalCode',
              label: 'utility_service.field.estate_unit_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'name',
              label: 'utility_service.field.estate_unit_name',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'type',
              label: 'utility_service.field.estate_unit_type',
              multiple: true,
              options: Object.values(EstateUnitType),
              enableColumnFilter: true,
              getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
            },
            {
              id: 'address',
              label: 'utility_service.field.address_toponymy',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => parseAddressToString(row.address, language),
            },
            {
              id: 'subNumbering',
              label: 'utility_service.field.address_indoor_number',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'usageTypeName',
              label: 'utility_service.field.estate_unit_usage_type',
              enableColumnFilter: true,
            },
            {
              id: 'cadastralUnitCoordinates',
              label: 'utility_service.field.estate_unit_cadastral_coordinates',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
          ]}
          rows={estateUnits}
          rowActionsVariant="inline"
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly
              ? undefined
              : {
                  color: 'secondary',
                  label: 'utility_service.action.add_estate_units',
                  onClick: handleOpenDialog,
                }
          }
          onDelete={readonly ? undefined : handleDelete}
          onView={(row) => {
            navigate(`/app/real-estate/estate-units/${row.id}`);
          }}
          useColumnVisibility={false}
          useRowSelection={false}
          useSelectedRows={false}
        />
      </Grid2>
    </Grid2>
  );
};
