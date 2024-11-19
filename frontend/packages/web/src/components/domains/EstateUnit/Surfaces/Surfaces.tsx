import { Grid2 } from '@mui/material';
import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitSurfaceFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEmptyEstateUnitSurfaceFormInput } from '../../../../utils/estateUnit/initialValues';
import { EstateUnitSurfaceDialog } from '../../../wizards/EstateUnitSurface/EstateUnitSurface';
import { EstateUnitSurfacesProps } from './Surfaces.types';

export const EstateUnitSurfaces = ({ control, readonly }: EstateUnitSurfacesProps) => {
  const { t } = useTranslation();
  const { fields, update } = useFieldArray({ control, name: 'surfaces' });
  const estateUnitType = useWatch({ control, name: 'estateUnitType' });
  const floors = useWatch({ control, name: 'floors' });
  const [estateUnitSurfaceDialogProps, setEstateUnitSurfaceDialogProps] = useState<number | null>(null);

  const handleCloseEstateUnitSurfaceDialog = useCallback(() => {
    setEstateUnitSurfaceDialogProps(null);
  }, []);

  const handleSaveEstateUnitSurfaceDialog = useCallback(
    (estateUnitSurface: EstateUnitSurfaceFormInput) => {
      if (estateUnitSurfaceDialogProps !== null) {
        update(estateUnitSurfaceDialogProps, estateUnitSurface);
      }
      handleCloseEstateUnitSurfaceDialog();
    },
    [estateUnitSurfaceDialogProps, update, handleCloseEstateUnitSurfaceDialog],
  );

  const handleCanRemoveEstateUnitSurface = useCallback(
    (index: number) =>
      [fields[index].surfaceSqMCommonArea, fields[index].surfaceSqMSideArea, fields[index].surfaceSqMTotal].some(
        (it) => !!it,
      ),
    [fields],
  );
  const handleRemoveEstateUnitSurface = useCallback(
    (index: number) => {
      update(index, getEmptyEstateUnitSurfaceFormInput(fields[index].metric));
    },
    [fields, update],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <SecondaryTable
          columns={
            estateUnitType === EstateUnitType.Ground
              ? ['estate_unit.field.surface_metric', 'estate_unit.field.surface_total_measure']
              : [
                  'estate_unit.field.surface_metric',
                  'estate_unit.field.surface_floors',
                  'estate_unit.field.surface_function_area',
                  'estate_unit.field.surface_total_measure',
                  'estate_unit.field.surface_common_area',
                  'estate_unit.field.surface_side_area',
                  'estate_unit.field.surface_function_area_type',
                ]
          }
          rows={fields.map((surface) =>
            estateUnitType === EstateUnitType.Ground
              ? [t(`common.enum.surface_measurement_metric.${surface.metric}`), surface.surfaceSqMTotal ?? '-']
              : surface.floors.length
                ? {
                    collapseColumnIndex: 0,
                    children: surface.floors.map((floor) =>
                      floor.functionAreas.length
                        ? {
                            collapseColumnIndex: 1,
                            children: floor.functionAreas.map((functionArea) => [
                              null,
                              null,
                              functionArea.functionArea.name,
                              functionArea.surfaceSqMTotal ?? 0,
                              functionArea.surfaceSqMCommonArea ?? 0,
                              functionArea.surfaceSqMSideArea ?? 0,
                              t(`common.enum.surface_type.${functionArea.functionArea.surfaceType}`),
                            ]),
                            row: [
                              null,
                              `(${floor.floor?.position}) ${floor.floor?.name}`,
                              null,
                              floor.surfaceSqMTotal ?? 0,
                              floor.surfaceSqMCommonArea ?? 0,
                              floor.surfaceSqMSideArea ?? 0,
                              null,
                            ],
                          }
                        : [
                            null,
                            `(${floor.floor?.position}) ${floor.floor?.name}`,
                            null,
                            floor.surfaceSqMTotal ?? 0,
                            floor.surfaceSqMCommonArea ?? 0,
                            floor.surfaceSqMSideArea ?? 0,
                            null,
                          ],
                    ),
                    row: [
                      t(`common.enum.surface_measurement_metric.${surface.metric}`),
                      surface.floors.length,
                      null,
                      surface.surfaceSqMTotal ?? 0,
                      surface.surfaceSqMCommonArea ?? 0,
                      surface.surfaceSqMSideArea ?? 0,
                      null,
                    ],
                  }
                : [
                    t(`common.enum.surface_measurement_metric.${surface.metric}`),
                    surface.floors.length,
                    null,
                    surface.surfaceSqMTotal ?? '-',
                    surface.surfaceSqMCommonArea ?? '-',
                    surface.surfaceSqMSideArea ?? '-',
                    null,
                  ],
          )}
          canRowDelete={handleCanRemoveEstateUnitSurface}
          onRowDelete={readonly ? undefined : handleRemoveEstateUnitSurface}
          onRowEdit={readonly ? undefined : setEstateUnitSurfaceDialogProps}
        />
      </Grid2>
      {estateUnitSurfaceDialogProps !== null && (
        <EstateUnitSurfaceDialog
          estateUnitFloors={floors}
          estateUnitSurface={fields[estateUnitSurfaceDialogProps]}
          estateUnitType={estateUnitType!}
          onClose={handleCloseEstateUnitSurfaceDialog}
          onSave={handleSaveEstateUnitSurfaceDialog}
        />
      )}
    </Grid2>
  );
};
