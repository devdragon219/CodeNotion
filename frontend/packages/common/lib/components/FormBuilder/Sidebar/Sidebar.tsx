import { Box, Grid2 } from '@mui/material';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { CustomFieldType } from '../../../gql/types';
import { SectionTitle } from '../../SectionTitle/SectionTitle';
import { FormBuilderSidebarDraggableField } from './DraggableField/DraggableField';
import { FormBuilderSidebarProps } from './Sidebar.types';

export const FormBuilderSidebar = ({ disabled }: FormBuilderSidebarProps) => (
  <Grid2 container spacing={2} sx={{ maxWidth: '280px' }}>
    <SectionTitle value="common.component.form_builder.description" />
    <Grid2 size={12}>
      <Box
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          px: 1.5,
          py: 3,
        })}
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          {Object.values(CustomFieldType).map((type) => (
            <FormBuilderSidebarDraggableField key={type} disabled={disabled} type={type} />
          ))}
        </Grid2>
      </Box>
    </Grid2>
  </Grid2>
);
