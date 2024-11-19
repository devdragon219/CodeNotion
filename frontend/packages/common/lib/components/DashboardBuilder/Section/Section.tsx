import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DeleteTwoTone } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DASHBOARD_SECTION_BACKGROUND_COLORS } from '../../../configs/dashboard';
import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { DashboardSectionBackgroundColor } from '../../../enums/DashboardSectionBackgroundColor';
import {
  DashboardBuilderRowFormInput,
  DashboardBuilderSectionFormInput,
} from '../../../interfaces/FormInputs/DashboardBuilder';
import { SelectField } from '../../Fields/Select/Select';
import { TextField } from '../../Fields/Text/Text';
import { DashboardBuilderRow } from './Row/Row';
import { DashboardBuilderSectionProps } from './Section.types';

export const DashboardBuilderSection = ({
  hasPlaceholder,
  path,
  readonly,
  section,
  widgetConfigurations,
  onChange,
}: DashboardBuilderSectionProps) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (key: keyof DashboardBuilderSectionFormInput) => (value: unknown) => {
      onChange({
        ...section,
        [key]: value,
      });
    },
    [onChange, section],
  );

  const handleRowChange = useCallback(
    (index: number) => (value: DashboardBuilderRowFormInput) => {
      onChange({
        ...section,
        rows: section.rows
          .map((row, rowIndex) => (rowIndex === index ? value : row))
          .filter((row) => row.widgets.length !== 0),
      });
    },
    [onChange, section],
  );

  const handleDelete = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <SortableContext
      disabled={readonly}
      id={`section_${section.guid}`}
      items={section.rows.map(({ guid }) => guid)}
      strategy={verticalListSortingStrategy}
    >
      <Stack direction="row" gap={2}>
        <Box
          sx={(theme) => ({
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: 3,
            position: 'relative',
            ...(section.backgroundColor && {
              backgroundColor: DASHBOARD_SECTION_BACKGROUND_COLORS[section.backgroundColor],
              p: 2,
            }),
            ...(!readonly && {
              border: `1px solid ${theme.palette.divider}`,
              p: 3,
            }),
            ...(hasPlaceholder && {
              border: `1px dashed ${theme.palette.blue[500]}`,
              backgroundColor: theme.palette.blue[50],
            }),
          })}
        >
          {readonly && section.title.trim().length !== 0 ? (
            <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {section.title}
            </Typography>
          ) : !readonly ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TextField
                label={t('common.component.dashboard_builder.field.section_title')}
                value={section.title}
                onChange={handleChange('title')}
                sx={{ minWidth: '300px' }}
                clearable
              />
              <SelectField
                label={t('common.component.dashboard_builder.field.section_color')}
                options={Object.values(DashboardSectionBackgroundColor)}
                getOptionLabel={(option) => t(`common.enum.dashboard_section_background_color.${option}`)}
                value={section.backgroundColor}
                onChange={handleChange('backgroundColor')}
                fullWidth={false}
                sx={{ minWidth: '150px' }}
                clearable
              />
            </Box>
          ) : (
            <></>
          )}
          {section.rows.map((row, rowIndex) => (
            <DashboardBuilderRow
              key={row.guid}
              hasBackground={!!section.backgroundColor}
              path={[path, rowIndex]}
              readonly={readonly}
              row={row}
              widgetConfigurations={widgetConfigurations}
              onChange={handleRowChange(rowIndex)}
            />
          ))}
        </Box>
        {!readonly && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleDelete}>
              <DeleteTwoTone />
            </IconButton>
          </Box>
        )}
      </Stack>
    </SortableContext>
  );
};
