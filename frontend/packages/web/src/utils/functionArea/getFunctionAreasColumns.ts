import { SurfaceType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { FunctionAreaFragment } from '../../gql/RealGimm.Web.FunctionArea.fragment';

export const getFunctionAreasColumns = (t: TFunction): TableColumn<FunctionAreaFragment>[] => [
  {
    id: 'internalCode',
    label: 'function_area.field.function_area_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'function_area.field.function_area_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'surfaceType',
    label: 'function_area.field.function_area_type',
    multiple: true,
    options: Object.values(SurfaceType),
    enableColumnFilter: true,
    getOptionLabel: (option) => t(`common.enum.surface_type.${option as SurfaceType}`),
  },
];
