import { Grid2 } from '@mui/material';
import { Alert, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { AsstAddressType, EstateStatus, EstateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { UtilityServiceCreateDialog } from '../../../wizards/UtilityService/UtilityService';
import { UtilityServiceEstatesProps } from './Estates.types';

export const UtilityServiceEstates = ({ control, errors, readonly, setValue }: UtilityServiceEstatesProps) => {
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
      setValue('estates', [...estates, ...utilityService.estates]);
      setValue('estateUnits', [...estateUnits, ...utilityService.estateUnits]);
      handleCloseDialog();
    },
    [estateUnits, estates, handleCloseDialog, setValue],
  );

  const handleDelete = useCallback(
    (rows: UtilityServiceFormInput['estates'][number] | UtilityServiceFormInput['estates'], onComplete: () => void) => {
      const ids = Array.isArray(rows) ? rows.map(({ id }) => id) : [rows.id];
      setValue(
        'estates',
        estates.filter(({ id }) => !ids.includes(id)),
      );
      setValue(
        'estateUnits',
        estateUnits.filter(({ estateId }) => !ids.includes(estateId)),
      );
      onComplete();
    },
    [estateUnits, estates, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isDialogOpen && (
        <UtilityServiceCreateDialog currentEstates={estates} onClose={handleCloseDialog} onSave={handleAdd} />
      )}
      {errors.estates?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.estates.message} />
        </Grid2>
      )}
      <SectionTitle value="utility_service.section_title.estates" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={[
            {
              id: 'internalCode',
              label: 'utility_service.field.estate_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'name',
              label: 'utility_service.field.estate_name',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'type',
              label: 'utility_service.field.estate_type',
              multiple: true,
              options: Object.values(EstateType),
              enableColumnFilter: true,
              getOptionLabel: (option) => t(`common.enum.estate_type.${option as EstateType}`),
            },
            {
              id: 'address',
              label: 'utility_service.field.address_toponymy',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) =>
                parseAddressToString(
                  row.addresses.find(({ addressType }) => addressType === AsstAddressType.Primary),
                  language,
                ),
            },
            {
              id: 'status',
              label: 'utility_service.field.estate_status',
              options: Object.values(EstateStatus),
              enableColumnFilter: true,
              getOptionLabel: (option) => t(`common.enum.estate_status.${option as EstateStatus}`),
            },
            {
              id: 'usageTypeName',
              label: 'utility_service.field.estate_usage_type',
              enableColumnFilter: true,
            },
            {
              id: 'managementSubjectName',
              label: 'utility_service.field.estate_management_subject',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
          ]}
          rows={estates}
          rowActionsVariant="inline"
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly
              ? undefined
              : {
                  color: 'secondary',
                  label: 'utility_service.action.add_estates',
                  onClick: handleOpenDialog,
                }
          }
          onDelete={readonly ? undefined : handleDelete}
          onView={(row) => {
            navigate(`/app/real-estate/estates/${row.id}`);
          }}
          useColumnVisibility={false}
          useRowSelection={false}
          useSelectedRows={false}
        />
      </Grid2>
    </Grid2>
  );
};
