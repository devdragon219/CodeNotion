import { AddCircleOutline } from '@mui/icons-material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ALLOWED_ESTATE_OWNERSHIPS } from '../../../configs/ownership';
import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteEstateUnitsDocument,
  ExportEstateUnitsDocument,
  GetEstateUnitsQueryVariables,
  useCreateEstateUnitMutation,
  useGetEstateUnitsQuery,
} from '../../../gql/RealGimm.Web.EstateUnit.operation';
import { useEstateUnit } from '../../../hooks/useEstateUnit';
import { useFeature } from '../../../hooks/useFeature';
import { EstateUnitFormInput } from '../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitsColumns } from '../../../utils/estateUnit/getEstateUnitsColumns';
import { getEstateUnitsFilterInput } from '../../../utils/estateUnit/getEstateUnitsFilterInput';
import { getEstateUnitsSortInput } from '../../../utils/estateUnit/getEstateUnitsSortInput';
import { parseEstateUnitFormInputToEstateUnitInput } from '../../../utils/estateUnit/parseEstateUnitFormInput';
import { EstateUnitCreateDialog } from '../../wizards/EstateUnit/EstateUnit';
import { EstateUnitsTableProps } from './EstateUnits.types';

export const EstateUnitsTable = ({ customActions, estate, estateUnitIds, readonly, status }: EstateUnitsTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_ESTATEUNIT_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetEstateUnitsQueryVariables>((variables) => ({
    ...variables,
    ...(estate || estateUnitIds || status
      ? {
          where: {
            ...(variables.where ?? {}),
            ...(estate
              ? {
                  estate: {
                    id: {
                      eq: estate.id,
                    },
                  },
                }
              : estateUnitIds
                ? {
                    id: {
                      in: estateUnitIds,
                    },
                  }
                : {
                    status: {
                      eq: status,
                    },
                  }),
          },
        }
      : {}),
  }));
  const [queryState, reexecuteQuery] = useGetEstateUnitsQuery({ pause, variables });
  const [, createEstateUnitMutation] = useCreateEstateUnitMutation();
  const { addDocumentsAsync } = useEstateUnit();
  const [loading, setLoading] = useState(false);
  const [isCreateEstateUnitDialogOpen, setCreateEstateUnitDialogOpen] = useState(false);
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnits, [queryState.data]);
  const hasNoEstateUnits = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (estateUnits?.totalCount ?? 0) === 0,
    [estateUnits, variables],
  );

  const handleOpenCreateEstateUnitDialog = useCallback(() => {
    setCreateEstateUnitDialogOpen(true);
  }, []);

  const handleCloseCreateEstateUnitDialog = useCallback(() => {
    setCreateEstateUnitDialogOpen(false);
  }, []);
  const handleSaveCreateEstateUnit = useCallback(
    async (estateUnit: EstateUnitFormInput) => {
      setLoading(true);
      const result = await createEstateUnitMutation({
        estateUnitInput: parseEstateUnitFormInputToEstateUnitInput(estateUnit),
      });
      setLoading(false);
      if (result.data?.estateUnit.add.isSuccess) {
        showSnackbar(t('estate_unit.feedback.create'), 'success');
        addDocumentsAsync(result.data.estateUnit.add.value!.id, estateUnit.documents);
        handleCloseCreateEstateUnitDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.estateUnit.add.validationErrors);
      }
    },
    [
      t,
      createEstateUnitMutation,
      addDocumentsAsync,
      handleCloseCreateEstateUnitDialog,
      reexecuteQuery,
      showSnackbar,
      showError,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoEstateUnits ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="estate.section_title.no_estate_units" />
      ) : (
        <PrimaryTable
          color={estate || estateUnitIds ? 'secondary' : 'primary'}
          columns={getEstateUnitsColumns(language, t, { useStatus: !status })}
          customTableActions={customActions}
          empty="estate_unit.text.no_estate_units"
          initialState={initialState}
          rows={estateUnits?.nodes ?? []}
          rowActionsVariant={estate ? 'inline' : 'menu'}
          totalCount={estateUnits?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate || (estate && !ALLOWED_ESTATE_OWNERSHIPS.includes(estate.ownership))
              ? undefined
              : estate
                ? {
                    color: 'secondary',
                    icon: <AddCircleOutline />,
                    label: 'estate.action.add_estate_unit',
                    onClick: handleOpenCreateEstateUnitDialog,
                  }
                : handleOpenCreateEstateUnitDialog
          }
          onDelete={
            readonly || !canDelete ? undefined : handleDelete('estate_unit', DeleteEstateUnitsDocument, reexecuteQuery)
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  navigate(`/app/real-estate/estate-units/${row.id}`, { state: { readonly: false } });
                }
          }
          onExport={readonly || !canRead ? undefined : handleExport('id', ExportEstateUnitsDocument)}
          onFilter={handleFilter(getEstateUnitsFilterInput)}
          onPageChange={handlePageChange(estateUnits?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getEstateUnitsSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/real-estate/estate-units/${row.id}`);
                }
              : undefined
          }
        />
      )}
      {isCreateEstateUnitDialogOpen && (
        <EstateUnitCreateDialog
          estate={estate}
          onClose={handleCloseCreateEstateUnitDialog}
          onSave={handleSaveCreateEstateUnit}
        />
      )}
    </>
  );
};
