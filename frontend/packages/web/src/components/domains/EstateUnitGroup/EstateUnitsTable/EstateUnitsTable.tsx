import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { EstateUnitGroupEstateUnitsTableProps } from './EstateUnitsTable.types';

export const EstateUnitGroupEstateUnitsTable = ({ estateUnits, onRowDelete }: EstateUnitGroupEstateUnitsTableProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <SecondaryTable
      columns={[
        'estate_unit_group.field.estate_unit_internal_code',
        'estate_unit_group.field.estate_unit_name',
        'estate_unit_group.field.estate_unit_type',
        'estate_unit_group.field.estate_unit_status',
        'estate_unit_group.field.estate_unit_address',
        'estate_unit_group.field.estate_unit_estate_internal_code',
        'estate_unit_group.field.estate_unit_estate_name',
      ]}
      rows={estateUnits.map((estateUnit) => [
        estateUnit.internalCode,
        estateUnit.name,
        t(`common.enum.estate_unit_type.${estateUnit.type}`),
        t(`common.enum.estate_unit_status.${estateUnit.status}`),
        parseAddressToString(estateUnit.address, language),
        estateUnit.estate.internalCode,
        estateUnit.estate.name,
      ])}
      onRowDelete={onRowDelete}
    />
  );
};
