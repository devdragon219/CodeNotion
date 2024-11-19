import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { UserType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SORTED_OFFICE_ACCESSES } from '../../../../configs/user';
import { useGetGroupsPermissionsQuery } from '../../../../gql/RealGimm.Web.Group.operation';
import { parsePermissionSummaryToPermissionsFormInput } from '../../../../utils/components/permissionsTable/parsePermissionSummaryFragment';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { PermissionsTable } from '../../../core/PermissionsTable/PermissionsTable';
import { UserConfigProps } from './Config.types';
import { GroupsField } from './GroupsField/GroupsField';

export const UserConfig = ({ control, errors, mode, readonly }: UserConfigProps) => {
  const { t } = useTranslation();
  const userType = useWatch({ control, name: 'userType' });
  const groups = useWatch({ control, name: 'groups' });

  const groupIds = useMemo(() => groups.map((group) => group.groupId), [groups]);

  const [getGroupsPermissionsState] = useGetGroupsPermissionsQuery({ variables: { groupIds } });

  const permissionsInput = useMemo(
    () => parsePermissionSummaryToPermissionsFormInput(getGroupsPermissionsState.data?.admin.groupPermissions),
    [getGroupsPermissionsState.data],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="user.tab.config" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        {userType === UserType.ExternalSupplier ? (
          <Controller
            name="supplierSubject"
            control={control}
            render={({ field }) => (
              <SubjectField
                {...field}
                label={t('user.field.supplier_subject')}
                error={!!errors.supplierSubject}
                helperText={errors.supplierSubject?.message}
                readonly={readonly}
                where={{
                  categories: {
                    some: {
                      function: {
                        eq: {
                          isSupplier: true,
                        },
                      },
                    },
                  },
                }}
                required
              />
            )}
          />
        ) : (
          <Controller
            name="officeAccess"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={t('user.field.office_access')}
                options={SORTED_OFFICE_ACCESSES}
                getOptionLabel={(option) => t(`common.enum.office_access.${option}`)}
                error={!!errors.officeAccess}
                helperText={errors.officeAccess?.message}
                readonly={readonly}
                useSortedOptions={false}
                required
              />
            )}
          />
        )}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <GroupsField control={control} errors={errors} readonly={readonly} />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <SectionTitle value="user.section_title.permissions" />
          <Grid2 size={12}>
            <PermissionsTable permissionsInput={permissionsInput} readonly />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
