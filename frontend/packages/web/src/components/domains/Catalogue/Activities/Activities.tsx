import { Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueActivitiesProps } from './Activities.types';

export const CatalogueActivities = ({ control, readonly }: CatalogueActivitiesProps) => {
  const { t } = useTranslation();
  const activities = useWatch({ control, name: 'catalogueType.activities' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {activities.length === 0 && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="catalogue.text.no_activities" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={['catalogue.field.activity_type', 'catalogue.field.activity_name']}
            rows={activities.map((entry) => [
              entry.activityType ? t(`common.enum.catalogue_type_activity_type.${entry.activityType}`) : null,
              entry.name,
            ])}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
