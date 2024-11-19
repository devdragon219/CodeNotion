import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateSubUnitFragment } from '../../../../../../gql/RealGimm.Web.EstateSubUnit.fragment';
import { useGetAllEstateSubUnitsQuery } from '../../../../../../gql/RealGimm.Web.EstateSubUnit.operation';
import { ContractLocatedUnitFormInput } from '../../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractLocatedUnitFormInput } from '../../../../../../utils/contract/initialValues';
import { ContractEstateSubUnitsProps } from './EstateSubUnits.types';

export const ContractEstateSubUnits = ({ control, excludeEstateSubUnitIds, setValue }: ContractEstateSubUnitsProps) => {
  const { t } = useTranslation();
  const managementSubject = useWatch({ control, name: 'managementSubject' });
  const [queryState] = useGetAllEstateSubUnitsQuery({
    variables: {
      where: {
        ...(excludeEstateSubUnitIds
          ? {
              id: {
                nin: excludeEstateSubUnitIds,
              },
            }
          : {}),
        ...(managementSubject
          ? {
              estateUnit: {
                managementSubjectId: {
                  eq: managementSubject.id,
                },
              },
            }
          : {}),
      },
    },
  });
  const estateSubUnits = useMemo(() => queryState.data?.estateSubUnit.listEstateSubUnitsFull ?? [], [queryState.data]);
  const locatedUnits = useWatch({ control, name: 'locatedUnits' });
  const value = useMemo(() => locatedUnits.map(({ estateSubUnit }) => estateSubUnit!), [locatedUnits]);

  const handleChange = useCallback(
    (value: EstateSubUnitFragment[]) => {
      setValue(
        'locatedUnits',
        value.map<ContractLocatedUnitFormInput>((estateSubUnit) =>
          getEmptyContractLocatedUnitFormInput({ estateSubUnit }),
        ),
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
            label: 'contract.field.located_unit_estate_sub_unit_code',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'estateUnit.name',
            label: 'contract.field.located_unit_estate_unit_name',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'estateUnit.address',
            label: 'contract.field.located_unit_estate_unit_address',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
            getRowValue: (row) =>
              `${row.estateUnit.address.toponymy}, ${row.estateUnit.address.numbering} ${row.estateUnit.address.cityName}`,
          },
          {
            id: 'estateUnit.type',
            label: 'contract.field.located_unit_estate_unit_type',
            enableGlobalFilter: true,
            options: Object.values(EstateUnitType),
            getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
          },
        ]}
        empty="contract.text.no_estate_sub_units"
        rows={estateSubUnits}
        titles={{
          left: 'contract.section_title.estate_sub_units',
          right: 'contract.section_title.selected_estate_sub_units',
        }}
        value={value}
        getRowId={({ id }) => String(id)}
        onChange={handleChange}
      />
    </>
  );
};
