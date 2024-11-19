import { EditTwoTone } from '@mui/icons-material';
import { Box, Grid2, IconButton, Stack, Theme, Typography } from '@mui/material';
import { Fragment, isValidElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseDateToLocalizedString } from '../../utils/dateUtils';
import { isOfType } from '../../utils/typeNarrowings/isOfType';
import { isValidDate } from '../../utils/typeNarrowings/isValidDate';
import { SecondaryTable } from '../Tables/Secondary/Secondary';
import {
  RecapSectionEmptyTableItem,
  RecapSectionItemValue,
  RecapSectionProps,
  RecapSectionTableItem,
} from './RecapSection.types';

export const RecapSection = ({ title, items, onEdit }: RecapSectionProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const titleSx = useCallback(
    (theme: Theme) => ({
      color: theme.palette.grey[700],
      display: 'inline-block',
      minWidth: '200px',
      pl: '10px',
      pr: 2,
    }),
    [],
  );
  const subtitleSx = useCallback(
    (theme: Theme) => ({
      color: theme.palette.grey[700],
      pl: '10px',
      textDecoration: 'underline',
    }),
    [],
  );
  const labelSx = useCallback(
    (theme: Theme) => ({
      color: theme.palette.grey[700],
      pl: '10px',
    }),
    [],
  );
  const valueSx = useCallback(
    (theme: Theme) => ({
      color: theme.palette.grey[600],
      ml: 5,
    }),
    [],
  );

  const getString = useCallback(
    (value: boolean | Date | number | null | string | undefined) => {
      if (isValidDate(value)) {
        return parseDateToLocalizedString(value, language) ?? '';
      }

      switch (typeof value) {
        case 'boolean':
          return t(`common.text.${value}`);
        case 'number':
          return String(value);
        case 'string':
          return value;
        default:
          return '';
      }
    },
    [language, t],
  );

  const isTableItem = useCallback(
    (value: unknown): value is RecapSectionTableItem => isOfType<RecapSectionTableItem>(value, ['columns', 'rows']),
    [],
  );

  const isEmptyTableItem = useCallback(
    (value: unknown): value is RecapSectionEmptyTableItem => isOfType<RecapSectionEmptyTableItem>(value, ['label']),
    [],
  );

  return (
    <Stack spacing="10px">
      <Box sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.blue[100]}`, pb: 1 })}>
        <Typography variant="bodyMd" sx={titleSx}>
          {t(title)}
        </Typography>
        <IconButton size="small" onClick={onEdit}>
          <EditTwoTone />
        </IconButton>
      </Box>
      <Box>
        {Array.isArray(items) ? (
          <Grid2 container spacing="10px">
            {items.map(({ grid, label, value }, index) =>
              Array.isArray(value) ? (
                <Fragment key={index}>
                  {label && (
                    <Grid2 size={12}>
                      <Typography variant="bodyMd" sx={subtitleSx}>
                        {t(label)}
                      </Typography>
                    </Grid2>
                  )}
                  {value.map(({ grid, label, value }, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: grid }}>
                      <Typography variant="bodySm" sx={labelSx}>
                        {t(label)}
                      </Typography>
                      <Typography variant="bodySm" sx={valueSx}>
                        {getString(value)}
                      </Typography>
                    </Grid2>
                  ))}
                </Fragment>
              ) : isTableItem(value) || isEmptyTableItem(value) ? (
                <Fragment key={index}>
                  {label && (
                    <Grid2 size={12}>
                      <Typography variant="bodyMd" sx={subtitleSx}>
                        {t(label)}
                      </Typography>
                    </Grid2>
                  )}
                  <Grid2 size={12}>
                    {isEmptyTableItem(value) ? (
                      <Typography variant="bodySm" sx={labelSx}>
                        {t(value.label)}
                      </Typography>
                    ) : (
                      <SecondaryTable
                        {...value}
                        sx={{
                          marginLeft: '-10px',
                          width: 'calc(100% + 10px)',
                        }}
                        size="small"
                      />
                    )}
                  </Grid2>
                </Fragment>
              ) : (
                <Grid2 key={index} size={{ xs: 12, sm: grid }}>
                  {label && (
                    <Typography variant="bodySm" sx={labelSx}>
                      {t(label)}
                    </Typography>
                  )}
                  {isValidElement(value) ? (
                    value
                  ) : (
                    <Typography variant="bodySm" sx={valueSx}>
                      {getString(value as RecapSectionItemValue)}
                    </Typography>
                  )}
                </Grid2>
              ),
            )}
          </Grid2>
        ) : (
          items
        )}
      </Box>
    </Stack>
  );
};
