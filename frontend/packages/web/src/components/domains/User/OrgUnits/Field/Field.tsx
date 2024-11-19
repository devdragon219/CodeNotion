import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EntryStatus, OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllOrgUnitsByManagementSubjectIdsQuery } from '../../../../../gql/RealGimm.Web.OrgUnit.operation';
import { getUserOrgUnitsInput } from '../../../../../utils/user/getUserOrgUnitsInput';
import { UserOrgUnitsFieldProps } from './Field.types';

export const UserOrgUnitsField = ({ control }: UserOrgUnitsFieldProps) => {
  const { t } = useTranslation();
  const managementSubjects = useWatch({ control, name: 'managementSubjects' });
  const [queryState] = useGetAllOrgUnitsByManagementSubjectIdsQuery({
    variables: {
      managementSubjectIds: managementSubjects.map(({ id }) => id),
      where: {
        entryStatus: { eq: EntryStatus.Working },
      },
    },
  });
  const orgUnits = useMemo(
    () => getUserOrgUnitsInput(queryState.data?.orgUnit.listOrgUnitsByManagementSubject),
    [queryState.data],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="orgUnits"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'internalCode',
                label: 'user.field.org_unit_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'user.field.org_unit_description',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'orgUnitType',
                label: 'user.field.org_unit_type',
                options: [OrgUnitType.ManagementHierarchy, OrgUnitType.GeographicalHierarchy],
                getOptionLabel: (option) => t(`common.enum.org_unit_type.${option as OrgUnitType}`),
                enableColumnFilter: true,
              },
            ]}
            empty="user.text.no_associated_org_units"
            rows={orgUnits}
            titles={{
              left: 'user.text.associable_org_units',
              right: 'user.text.associated_org_units',
            }}
            getRowId={({ orgUnitId }) => String(orgUnitId)}
          />
        )}
      />
    </>
  );
};
