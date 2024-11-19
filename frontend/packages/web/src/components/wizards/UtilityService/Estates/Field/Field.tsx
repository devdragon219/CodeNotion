import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { AsstAddressType, EstateType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllEstatesQuery } from '../../../../../gql/RealGimm.Web.Estate.operation';
import { EstatesFieldProps } from './Field.types';

export const EstatesField = ({ control, currentEstates }: EstatesFieldProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetAllEstatesQuery({
    ...(currentEstates
      ? {
          variables: {
            where: {
              id: {
                nin: currentEstates.map(({ id }) => id),
              },
            },
          },
        }
      : {}),
  });
  const estates = useMemo(
    () =>
      (queryState.data?.estate.listEstatesFull ?? []).map((estate) => ({
        addresses: estate.addresses,
        id: estate.id,
        internalCode: estate.internalCode,
        managementSubjectName: estate.managementSubjectName ?? '',
        name: estate.name ?? '',
        status: estate.status,
        type: estate.type,
        usageTypeName: estate.usageType.name,
      })),
    [queryState.data],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="estates"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
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
                id: 'address',
                label: 'utility_service.field.address_toponymy',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => {
                  const address = row.addresses.find(({ addressType }) => addressType === AsstAddressType.Primary);
                  return `${address?.toponymy}, ${address?.numbering} ${address?.cityName}`;
                },
              },
              {
                id: 'type',
                label: 'utility_service.field.estate_type',
                enableColumnFilter: true,
                options: Object.values(EstateType),
                multiple: true,
                getOptionLabel: (option) => t(`common.enum.estate_type.${option as EstateType}`),
              },
            ]}
            empty="utility_service.text.no_estates"
            rows={estates}
            titles={{
              left: 'utility_service.section_title.select_estates',
              right: 'utility_service.section_title.selected_estates',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
