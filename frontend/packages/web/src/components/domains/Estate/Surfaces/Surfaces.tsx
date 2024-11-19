import { Grid2 } from '@mui/material';
import { EmptyText, Loader, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetEstateSurfacesQuery } from '../../../../gql/RealGimm.Web.Estate.operation';
import { EstateSurfacesProps } from './Surfaces.types';

export const EstateSurfaces = ({ control, readonly }: EstateSurfacesProps) => {
  const { t } = useTranslation();
  const estateId = useWatch({ control, name: 'estateId' });
  const [queryState] = useGetEstateSurfacesQuery({ variables: { estateId: estateId! } });
  const surfaces = useMemo(() => queryState.data?.estate.surfaces ?? [], [queryState.data]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      {surfaces.length === 0 ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="estate.section_title.no_surfaces" />
      ) : (
        <>
          <SectionTitle value="estate.section_title.total_surfaces" />
          {!readonly && <EmptyText value="estate.text.surfaces" />}
        </>
      )}
      {surfaces.length !== 0 && (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'estate.field.surface_unit',
              'estate.field.surface_total',
              'estate.field.surface_common_area',
              'estate.field.surface_side_area',
              'estate.field.surface_heritage_type',
            ]}
            rows={surfaces.map((entry) => [
              t(`common.enum.surface_measurement_metric.${entry.metric}`),
              entry.surfaceSqMTotal,
              entry.surfaceSqMCommonArea,
              entry.surfaceSqMSideArea,
              t(`common.enum.estate_unit_heritage_type.${entry.heritageType}`),
            ])}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
