import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitOwnershipType, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { useGetAllEstateUnitsQuery } from '../../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { ContractLocatedUnitFormInput } from '../../../../../../interfaces/FormInputs/Contract';
import { parseAddressToString } from '../../../../../../utils/addressUtils';
import { getEmptyContractLocatedUnitFormInput } from '../../../../../../utils/contract/initialValues';
import { ContractEstateUnitsProps } from './EstateUnits.types';

export const ContractEstateUnits = ({ control, excludeEstateUnitIds, setValue }: ContractEstateUnitsProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const managementSubject = useWatch({ control, name: 'managementSubject' });
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        ...(excludeEstateUnitIds
          ? {
              id: {
                nin: excludeEstateUnitIds,
              },
            }
          : {}),
        ...(managementSubject
          ? {
              managementSubjectId: {
                eq: managementSubject.id,
              },
            }
          : {}),
        ownershipType: {
          eq: EstateUnitOwnershipType.ThirdParties,
        },
      },
    },
  });
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnitsFull ?? [], [queryState.data]);
  const locatedUnits = useWatch({ control, name: 'locatedUnits' });
  const value = useMemo(() => locatedUnits.map(({ estateUnit }) => estateUnit!), [locatedUnits]);

  const handleChange = useCallback(
    (value: EstateUnitFragment[]) => {
      setValue(
        'locatedUnits',
        value.map<ContractLocatedUnitFormInput>((estateUnit) => getEmptyContractLocatedUnitFormInput({ estateUnit })),
      );
    },
    [setValue],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <TransferList
        columns={[
          {
            id: 'internalCode',
            label: 'contract.field.located_unit_estate_unit_code',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'name',
            label: 'contract.field.located_unit_estate_unit_name',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'address',
            label: 'contract.field.located_unit_estate_unit_address',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
            getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
          },
          {
            id: 'type',
            label: 'contract.field.located_unit_estate_unit_type',
            enableGlobalFilter: true,
            options: Object.values(EstateUnitType),
            getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
          },
        ]}
        empty="contract.text.no_estate_units"
        rows={estateUnits}
        titles={{
          left: 'contract.section_title.estate_units',
          right: 'contract.section_title.selected_estate_units',
        }}
        value={value}
        getRowId={({ id }) => String(id)}
        onChange={handleChange}
      />
    </>
  );
};
