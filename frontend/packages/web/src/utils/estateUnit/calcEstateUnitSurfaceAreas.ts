import { SurfaceType } from '@realgimm5/frontend-common/gql/types';

import { SurfaceMode } from '../../enums/SurfaceMode';
import {
  EstateUnitFunctionAreaSurfaceFormInput,
  EstateUnitSurfaceFormInput,
} from '../../interfaces/FormInputs/EstateUnit';

export const calcEstateUnitSurfaceAreas = (
  estateUnitSurface: EstateUnitSurfaceFormInput,
  surfaceMode: SurfaceMode,
): EstateUnitSurfaceFormInput => {
  const parseEstateUnitSurfaceAreas = () => {
    const surface: EstateUnitSurfaceFormInput = {
      surfaceId: estateUnitSurface.surfaceId,
      metric: estateUnitSurface.metric,
      surfaceSqMTotal: estateUnitSurface.surfaceSqMTotal,
      surfaceSqMCommonArea: estateUnitSurface.surfaceSqMCommonArea,
      surfaceSqMSideArea: estateUnitSurface.surfaceSqMSideArea,
      floors: [],
    };

    switch (surfaceMode) {
      case SurfaceMode.Total:
        return surface;
      case SurfaceMode.Floor:
        return {
          ...surface,
          floors: estateUnitSurface.floors
            .filter(({ surfaceSqMCommonArea, surfaceSqMSideArea, surfaceSqMTotal }) =>
              [surfaceSqMCommonArea, surfaceSqMSideArea, surfaceSqMTotal].some((it) => !!it),
            )
            .map((floor) => ({
              ...floor,
              functionAreas: [],
            })),
        };
      case SurfaceMode.FunctionArea:
        return {
          ...surface,
          floors: estateUnitSurface.floors
            .map((floor) => ({
              ...floor,
              functionAreas: floor.functionAreas
                .filter(({ surfaceSqMCommonArea, surfaceSqMSideArea, surfaceSqMTotal }) =>
                  [surfaceSqMCommonArea, surfaceSqMSideArea, surfaceSqMTotal].some((it) => !!it),
                )
                .map((functionArea) => {
                  const getSurfaceSqMTotal = () => {
                    switch (functionArea.functionArea.surfaceType) {
                      case SurfaceType.CommonArea:
                        return functionArea.surfaceSqMCommonArea;
                      case SurfaceType.MainArea:
                        return functionArea.surfaceSqMTotal;
                      case SurfaceType.SideArea:
                        return functionArea.surfaceSqMSideArea;
                    }
                  };

                  return {
                    ...functionArea,
                    surfaceSqMTotal: getSurfaceSqMTotal() ?? 0,
                  };
                }),
            }))
            .filter(({ functionAreas }) => functionAreas.length !== 0),
        };
    }
  };

  const calcFunctionAreasSurface = (
    functionAreas: EstateUnitFunctionAreaSurfaceFormInput[],
    surfaceType: SurfaceType,
  ) =>
    functionAreas.reduce((acc, it) => {
      const getSurface = () => {
        switch (surfaceType) {
          case SurfaceType.CommonArea:
            return it.surfaceSqMCommonArea ?? 0;
          case SurfaceType.MainArea:
            return it.surfaceSqMTotal ?? it.surfaceSqMCommonArea ?? it.surfaceSqMSideArea ?? 0;
          case SurfaceType.SideArea:
            return it.surfaceSqMSideArea ?? 0;
        }
      };

      if (surfaceType === SurfaceType.MainArea) {
        return acc + getSurface();
      }

      return acc + (it.functionArea.surfaceType === surfaceType ? getSurface() : 0);
    }, 0);

  const surface = parseEstateUnitSurfaceAreas();
  switch (surfaceMode) {
    case SurfaceMode.Total:
      return surface;
    case SurfaceMode.Floor:
      return {
        ...surface,
        surfaceSqMCommonArea: surface.floors.reduce((acc, it) => acc + (it.surfaceSqMCommonArea ?? 0), 0),
        surfaceSqMSideArea: surface.floors.reduce((acc, it) => acc + (it.surfaceSqMSideArea ?? 0), 0),
        surfaceSqMTotal: surface.floors.reduce((acc, it) => acc + (it.surfaceSqMTotal ?? 0), 0),
      };
    case SurfaceMode.FunctionArea:
      return {
        ...surface,
        surfaceSqMCommonArea: surface.floors.reduce(
          (acc, { functionAreas }) => acc + calcFunctionAreasSurface(functionAreas, SurfaceType.CommonArea),
          0,
        ),
        surfaceSqMSideArea: surface.floors.reduce(
          (acc, { functionAreas }) => acc + calcFunctionAreasSurface(functionAreas, SurfaceType.SideArea),
          0,
        ),
        surfaceSqMTotal: surface.floors.reduce(
          (acc, { functionAreas }) => acc + calcFunctionAreasSurface(functionAreas, SurfaceType.MainArea),
          0,
        ),
        floors: surface.floors.map((floor) => ({
          ...floor,
          surfaceSqMCommonArea: calcFunctionAreasSurface(floor.functionAreas, SurfaceType.CommonArea),
          surfaceSqMSideArea: calcFunctionAreasSurface(floor.functionAreas, SurfaceType.SideArea),
          surfaceSqMTotal: calcFunctionAreasSurface(floor.functionAreas, SurfaceType.MainArea),
        })),
      };
  }
};
