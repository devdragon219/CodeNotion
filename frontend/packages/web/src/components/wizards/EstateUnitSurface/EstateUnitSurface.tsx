import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { EstateUnitType, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SurfaceMode } from '../../../enums/SurfaceMode';
import { useGetAllFunctionAreasQuery } from '../../../gql/RealGimm.Web.FunctionArea.operation';
import { EstateUnitSurfaceFormInput } from '../../../interfaces/FormInputs/EstateUnit';
import { calcEstateUnitSurfaceAreas } from '../../../utils/estateUnit/calcEstateUnitSurfaceAreas';
import { getSurfaceModeFromEstateUnitSurfaceFormInput } from '../../../utils/estateUnit/getSurfaceMode';
import {
  getEmptyEstateUnitFloorSurfaceFormInput,
  getEmptyEstateUnitSurfaceFormInput,
} from '../../../utils/estateUnit/initialValues';
import { EstateUnitSurfaceEnterSurfaceStep } from './EnterSurface/EnterSurface';
import { EstateUnitSurfaceDialogProps } from './EstateUnitSurface.types';
import { EstateUnitSurfaceSelectSurfaceStep } from './SelectSurface/SelectSurface';

export const EstateUnitSurfaceDialog = ({
  estateUnitFloors,
  estateUnitSurface,
  estateUnitType,
  onClose,
  onSave,
}: EstateUnitSurfaceDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [pristine, setPristine] = useState(true);
  const [surface, setSurface] = useState(estateUnitSurface);
  const [surfaceMode, setSurfaceMode] = useState(getSurfaceModeFromEstateUnitSurfaceFormInput(estateUnitSurface));
  const [queryState] = useGetAllFunctionAreasQuery({
    variables: {
      order: {
        name: SortEnumType.Asc,
      },
    },
  });
  const functionAreas = useMemo(
    () =>
      queryState.data?.functionArea.listFunctionAreasFull.map(({ id, name, surfaceType }) => ({
        id,
        name,
        surfaceType,
      })) ?? [],
    [queryState.data],
  );

  useEffect(() => {
    if (functionAreas.length) {
      setSurface((surface) => ({
        ...surface,
        floors:
          surface.floors.length !== 0
            ? surface.floors.map((floor) => ({
                ...floor,
                functionAreas: functionAreas.map(
                  (functionArea) =>
                    floor.functionAreas.find(({ functionArea: { id } }) => functionArea.id === id) ?? {
                      functionArea,
                      surfaceId: null,
                      surfaceSqMCommonArea: null,
                      surfaceSqMSideArea: null,
                      surfaceSqMTotal: null,
                    },
                ),
              }))
            : [getEmptyEstateUnitFloorSurfaceFormInput(functionAreas)],
      }));
    }
  }, [functionAreas]);

  useEffect(() => {
    if (!pristine) {
      setSurface((surface) => {
        switch (surfaceMode) {
          case SurfaceMode.Total:
            return getEmptyEstateUnitSurfaceFormInput(surface.metric);
          case SurfaceMode.Floor:
            return {
              ...getEmptyEstateUnitSurfaceFormInput(surface.metric),
              floors: [getEmptyEstateUnitFloorSurfaceFormInput()],
            };
          case SurfaceMode.FunctionArea:
            return {
              ...getEmptyEstateUnitSurfaceFormInput(surface.metric),
              floors: [getEmptyEstateUnitFloorSurfaceFormInput(functionAreas)],
            };
        }
      });
    }
    // eslint-disable-next-line
  }, [surfaceMode]);

  const handleSurfaceModeChange = useCallback((surfaceMode: SurfaceMode) => {
    setPristine(false);
    setSurfaceMode(surfaceMode);
  }, []);

  const handleSave = useCallback(
    (estateUnitSurface: EstateUnitSurfaceFormInput) => {
      onSave(calcEstateUnitSurfaceAreas(estateUnitSurface, surfaceMode));
    },
    [surfaceMode, onSave],
  );

  return (
    <Dialog fullScreen open title="estate_unit.dialog.surfaces.title" onClose={onClose}>
      {estateUnitType === EstateUnitType.Ground ? (
        <EstateUnitSurfaceEnterSurfaceStep
          estateUnitFloors={estateUnitFloors}
          estateUnitSurface={surface}
          estateUnitType={estateUnitType}
          functionAreas={functionAreas}
          surfaceMode={surfaceMode}
          onChange={setSurface}
          onError={handleError}
          onSave={handleSave}
        />
      ) : (
        <Stepper
          activeStep={activeStep}
          error={error}
          steps={[
            {
              label: 'estate_unit.tab.select_surface',
              children: (
                <EstateUnitSurfaceSelectSurfaceStep
                  surfaceMode={surfaceMode}
                  onChange={handleSurfaceModeChange}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit.tab.enter_surface',
              children: (
                <EstateUnitSurfaceEnterSurfaceStep
                  estateUnitFloors={estateUnitFloors}
                  estateUnitSurface={surface}
                  estateUnitType={estateUnitType}
                  functionAreas={functionAreas}
                  surfaceMode={surfaceMode}
                  onBack={handleBack}
                  onChange={setSurface}
                  onError={handleError}
                  onSave={handleSave}
                />
              ),
            },
          ]}
        />
      )}
    </Dialog>
  );
};
