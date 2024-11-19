import { TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../../utils/addressUtils';
import { EstateUnitsTransferListProps } from './TransferList.types';

export const EstateUnitsTransferList = ({ control, estateUnits }: EstateUnitsTransferListProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  return (
    <Controller
      name="estateUnits"
      control={control}
      render={({ field }) => (
        <TransferList
          {...field}
          columns={[
            {
              id: 'internalCode',
              label: 'ticket_checklist.field.estate_unit_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'name',
              label: 'ticket_checklist.field.estate_unit_name',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
            {
              id: 'address',
              label: 'ticket_checklist.field.estate_unit_address',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
            },
            {
              id: 'type',
              label: 'ticket_checklist.field.estate_unit_type',
              enableGlobalFilter: true,
              options: Object.values(EstateUnitType),
              getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
            },
          ]}
          empty="ticket_checklist.text.no_estate_units_selected"
          rows={estateUnits}
          titles={{
            left: 'ticket_checklist.section_title.select_estate_units',
            right: 'ticket_checklist.section_title.selected_estate_units',
          }}
          getRowId={({ id }) => String(id)}
        />
      )}
    />
  );
};
