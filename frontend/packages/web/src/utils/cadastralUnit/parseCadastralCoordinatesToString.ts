import { CoordinateType } from '@realgimm5/frontend-common/gql/types';

import { CadastralCoordinatesFragment } from '../../gql/RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralCoordinateFormInput } from '../../interfaces/FormInputs/CadastralUnit';

export const parseCadastralCoordinatesToString = (
  coordinates: CadastralCoordinatesFragment[] | CadastralCoordinateFormInput[] | null | undefined,
) => {
  if (!coordinates) return '-';

  const filteredCoordinates = coordinates
    .map((coordinate) => {
      if (coordinate.coordinateType === CoordinateType.GenericOverride) {
        return coordinate.unmanagedOverride;
      }

      const { level1, level2, level3, level4 } = coordinate;
      const levels = [
        level1 ? `Sez. ${level1}` : null,
        level2 ? `Fg. ${level2}` : null,
        level3 ? `Mapp. ${level3}` : null,
        level4 ? `Sub. ${level4}` : null,
      ].filter((it) => !!it);

      if (levels.length === 0) return null;
      if (!coordinate.hasITTavData) return levels.join(' - ');

      const { itTavCorpo, itTavPartita, itTavPorzione } = coordinate;
      return [
        ...levels,
        itTavPartita ? `Part. ${itTavPartita}` : null,
        itTavCorpo ? `Corpo ${itTavCorpo}` : null,
        itTavPorzione ? `Porz. ${itTavPorzione}` : null,
      ]
        .filter((it) => !!it)
        .join(' - ');
    })
    .filter((it) => !!it);

  if (filteredCoordinates.length === 0) return '-';

  return filteredCoordinates.join(', ');
};
