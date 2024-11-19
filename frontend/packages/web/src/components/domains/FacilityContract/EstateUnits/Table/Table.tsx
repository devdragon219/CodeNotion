import { PrimaryTable } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { getEstateUnitsColumns } from '../../../../../utils/estateUnit/getEstateUnitsColumns';
import { FacilityContractEstateUnitsTableProps } from './Table.types';

export const FacilityContractEstateUnitsTable = ({ estateUnits, onDelete }: FacilityContractEstateUnitsTableProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (!onDelete) return undefined;

    return (rows: EstateUnitFragment | EstateUnitFragment[]) => {
      onDelete(Array.isArray(rows) ? rows : [rows]);
    };
  }, [onDelete]);

  return (
    <PrimaryTable
      color="secondary"
      columns={getEstateUnitsColumns(language, t)}
      empty="estate_unit.text.no_estate_units"
      rows={estateUnits}
      rowActionsVariant="inline"
      totalCount={estateUnits.length}
      useRowSelection={false}
      useSelectedRows={false}
      getRowId={({ id }) => String(id)}
      onDelete={handleDelete()}
      onView={(row) => {
        navigate(`/app/real-estate/estate-units/${row.id}`);
      }}
    />
  );
};
