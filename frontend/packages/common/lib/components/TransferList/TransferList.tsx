import { AddCircleOutline, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import { ForwardedRef, ReactElement, forwardRef, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PrimaryTable } from '../Tables/Primary/Primary';
import { TransferListProps } from './TransferList.types';

const TransferList = <T,>(
  {
    empty,
    fixedValues,
    rows,
    titles,
    value,
    getRowId,
    onAdd,
    onChange,
    onLoadMore,
    ...tableProps
  }: TransferListProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [selectedSourceRows, setSelectedSourceRows] = useState<T[]>([]);
  const [selectedTargetRows, setSelectedTargetRows] = useState<T[]>([]);
  const matchDownLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const gridTemplateAreas = useCallback(
    (theme: Theme) => {
      if (titles) {
        return {
          gridTemplateAreas: '"left-title actions right-title" "left-table actions right-table"',
          [theme.breakpoints.down('md')]: {
            gridTemplateAreas: '"left-title" "left-table" "actions" "right-title" "right-table"',
          },
        };
      }

      return {
        gridTemplateAreas: '"left-table actions right-table"',
        [theme.breakpoints.down('md')]: {
          gridTemplateAreas: '"left-table" "actions" "right-table"',
        },
      };
    },
    [titles],
  );

  const sourceRows = useMemo(() => {
    const ids = value.map((row) => getRowId(row));
    return rows.filter((row) => !ids.includes(getRowId(row)));
  }, [value, rows, getRowId]);

  const handleAddToTargetClick = useCallback(() => {
    onChange([...value, ...selectedSourceRows]);
  }, [value, selectedSourceRows, onChange]);
  const handleRemoveFromTargetClick = useCallback(() => {
    const ids = selectedTargetRows.map((row) => getRowId(row));

    onChange(value.filter((row) => !ids.includes(getRowId(row))));
  }, [value, selectedTargetRows, getRowId, onChange]);

  const handleCanSelectRow = useMemo(() => {
    if (!fixedValues || fixedValues.length === 0) {
      return undefined;
    }

    const fixedIds = fixedValues.map(getRowId);
    return (row: T) => !fixedIds.includes(getRowId(row));
  }, [fixedValues, getRowId]);

  return (
    <Box ref={ref} sx={{ height: '100%', overflowY: 'auto' }}>
      <Box
        sx={[
          (theme) => ({
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gridTemplateRows: 'auto 1fr',
            gap: '20px 40px',
            [theme.breakpoints.down('lg')]: {
              gap: '24px',
            },
            [theme.breakpoints.up('md')]: {
              height: '100%',
            },
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '100%',
              gridTemplateRows: 'auto',
            },
          }),
          gridTemplateAreas,
        ]}
      >
        {(titles?.left || onAdd) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {titles?.left && (
              <Typography sx={(theme) => ({ color: theme.palette.grey[700], gridArea: 'left-title' })} variant="h5">
                {t(titles.left)}
              </Typography>
            )}
            {onAdd && (
              <Button
                size="large"
                variant="contained"
                color={onAdd.color ?? 'secondary'}
                startIcon={onAdd.icon ?? <AddCircleOutline />}
                onClick={onAdd.onClick}
              >
                {t(onAdd.label)}
              </Button>
            )}
          </Box>
        )}
        <Box
          sx={(theme) => ({
            gridArea: 'left-table',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowX: 'auto',
            [theme.breakpoints.down('md')]: {
              height: '400px',
            },
          })}
        >
          <PrimaryTable
            {...tableProps}
            color="secondary"
            sx={{ height: 'calc(100% - 84px)', overflowY: 'auto' }}
            enableColumnResizing={false}
            rows={sourceRows}
            usePagination={false}
            useSelectedRows={false}
            getRowId={getRowId}
            onPageChange={onLoadMore}
            onRowsSelected={setSelectedSourceRows}
            useColumnVisibility={false}
            useVirtualizedRows
          />
        </Box>
        <Box
          sx={(theme) => ({
            gridArea: 'actions',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            [theme.breakpoints.down('md')]: {
              flexDirection: 'row',
            },
          })}
        >
          {matchDownLg ? (
            <IconButton
              color="secondary"
              onClick={handleAddToTargetClick}
              disabled={selectedSourceRows.length === 0}
              sx={(theme) => ({ [theme.breakpoints.down('md')]: { transform: 'rotate(90deg)' } })}
            >
              <ChevronRight />
            </IconButton>
          ) : (
            <Button
              color="secondary"
              onClick={handleAddToTargetClick}
              disabled={selectedSourceRows.length === 0}
              endIcon={
                <ChevronRight
                  sx={(theme) => ({
                    [theme.breakpoints.down('md')]: {
                      transform: 'rotate(90deg)',
                    },
                  })}
                />
              }
            >
              {t('common.button.add')}
            </Button>
          )}
          {matchDownLg ? (
            <IconButton
              color="secondary"
              onClick={handleRemoveFromTargetClick}
              disabled={selectedTargetRows.length === 0}
              sx={(theme) => ({ [theme.breakpoints.down('md')]: { transform: 'rotate(90deg)' } })}
            >
              <ChevronLeft />
            </IconButton>
          ) : (
            <Button
              color="secondary"
              onClick={handleRemoveFromTargetClick}
              disabled={selectedTargetRows.length === 0}
              startIcon={
                <ChevronLeft
                  sx={(theme) => ({
                    [theme.breakpoints.down('md')]: {
                      transform: 'rotate(90deg)',
                    },
                  })}
                />
              }
            >
              {t('common.button.remove')}
            </Button>
          )}
        </Box>
        {titles?.right && (
          <Typography
            sx={(theme) => ({
              color: theme.palette.grey[700],
              gridArea: 'right-title',
              [theme.breakpoints.up('md')]: {
                textAlign: 'right',
              },
            })}
            variant="h5"
          >
            {t(titles.right)}
          </Typography>
        )}
        <Box
          sx={(theme) => ({
            gridArea: 'right-table',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowX: 'auto',
            [theme.breakpoints.down('md')]: {
              maxHeight: '400px',
            },
          })}
        >
          {value.length ? (
            <PrimaryTable
              color="secondary"
              sx={{ height: 'calc(100% - 84px)' }}
              columns={tableProps.columns}
              enableColumnResizing={false}
              rows={value}
              usePagination={false}
              useSelectedRows={false}
              getCanSelectRow={handleCanSelectRow}
              getRowId={getRowId}
              onRowsSelected={setSelectedTargetRows}
              useColumnVisibility={false}
              useVirtualizedRows
            />
          ) : empty ? (
            <Box sx={{ display: 'grid', height: '100%', placeItems: 'center' }}>
              <Typography sx={(theme) => ({ color: theme.palette.grey[700] })} variant="h5">
                {t(empty)}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};
TransferList.displayName = 'TransferList';

const ForwardedTransferList = forwardRef(TransferList) as <T>(
  props: TransferListProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedTransferList as TransferList };
