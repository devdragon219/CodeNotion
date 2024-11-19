import { Grid2 } from '@mui/material';
import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserOrgUnitFormInput } from '../../../../interfaces/FormInputs/User';
import { UserOrgUnitsDialog } from './Dialog/Dialog';
import { UserOrgUnitsProps } from './OrgUnits.types';

export const UserOrgUnits = ({ control, readonly, setValue }: UserOrgUnitsProps) => {
  const { t } = useTranslation();
  const orgUnits = useWatch({ control, name: 'orgUnits' });
  const managementSubjects = useWatch({ control, name: 'managementSubjects' });
  const [isOrgUnitsDialogOpen, setOrgUnitsDialogOpen] = useState(false);

  const input = useMemo(
    () => ({
      orgUnits,
      managementSubjects,
    }),
    [managementSubjects, orgUnits],
  );

  const handleCloseOrgUnitsDialog = useCallback(() => {
    setOrgUnitsDialogOpen(false);
  }, []);
  const handleOpenOrgUnitsDialog = useCallback(() => {
    setOrgUnitsDialogOpen(true);
  }, []);
  const handleSaveOrgUnits = useCallback(
    (orgUnits: UserOrgUnitFormInput[]) => {
      setValue('orgUnits', orgUnits);
      setOrgUnitsDialogOpen(false);
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <SecondaryTable
          columns={[
            'user.field.org_unit_code',
            'user.field.org_unit_description',
            'user.field.org_unit_type',
            'user.field.org_unit_management_subject',
            'user.field.org_unit_group_society',
            'user.field.org_unit_parent_org_unit',
          ]}
          rows={orgUnits.map((entry) => [
            entry.internalCode,
            entry.name,
            t(`common.enum.org_unit_type.${entry.orgUnitType}`),
            entry.managementSubjectName,
            entry.groupSocietyName,
            entry.parentOrgUnitName,
          ])}
          onEdit={!readonly ? handleOpenOrgUnitsDialog : undefined}
        />
      </Grid2>
      {isOrgUnitsDialogOpen && (
        <UserOrgUnitsDialog input={input} onClose={handleCloseOrgUnitsDialog} onSave={handleSaveOrgUnits} />
      )}
    </Grid2>
  );
};
