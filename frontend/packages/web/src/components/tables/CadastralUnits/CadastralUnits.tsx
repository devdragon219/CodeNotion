import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteCadastralUnitsDocument,
  ExportCadastralUnitsDocument,
  GetCadastralUnitsQueryVariables,
  useCreateCadastralUnitMutation,
  useGetCadastralUnitsQuery,
} from '../../../gql/RealGimm.Web.CadastralUnit.operation';
import { useFeature } from '../../../hooks/useFeature';
import { CadastralUnitFormInput } from '../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitsColumns } from '../../../utils/cadastralUnit/getCadastralUnitsColumns';
import { getCadastralUnitsFilterInput } from '../../../utils/cadastralUnit/getCadastralUnitsFilterInput';
import { getCadastralUnitsSortInput } from '../../../utils/cadastralUnit/getCadastralUnitsSortInput';
import { parseCadastralUnitFormInputToCadastralUnitInput } from '../../../utils/cadastralUnit/parseCadastralUnitFormInput';
import { CadastralUnitCreateDialog } from '../../wizards/CadastralUnit/CadastralUnit';
import { CadastralUnitsTableProps } from './CadastralUnits.types';

export const CadastralUnitsTable = ({ status }: CadastralUnitsTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CADASTRALUNIT_BASE);
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
  } = useTable<GetCadastralUnitsQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(status
        ? {
            status: {
              eq: status,
            },
          }
        : {}),
    },
  }));
  const [queryState, reexecuteQuery] = useGetCadastralUnitsQuery({ pause, variables });
  const [, createCadastralUnitMutation] = useCreateCadastralUnitMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateCadastralUnitDialogOpen, setCreateCadastralUnitDialogOpen] = useState(false);
  const cadastralUnits = useMemo(() => queryState.data?.cadastralUnit.listCadastralUnits, [queryState.data]);

  const handleOpenCreateCadastralUnitDialog = useCallback(() => {
    setCreateCadastralUnitDialogOpen(true);
  }, []);

  const handleCloseCreateCadastralUnitDialog = useCallback(() => {
    setCreateCadastralUnitDialogOpen(false);
  }, []);
  const handleSaveCreateCadastralUnit = useCallback(
    async (cadastralUnit: CadastralUnitFormInput) => {
      setLoading(true);
      const result = await createCadastralUnitMutation({
        cadastralUnitInput: parseCadastralUnitFormInputToCadastralUnitInput(cadastralUnit),
      });
      setLoading(false);
      if (result.data?.cadastralUnit.addCadastralUnit.isSuccess) {
        showSnackbar(t('cadastral_unit.feedback.create'), 'success');
        handleCloseCreateCadastralUnitDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.cadastralUnit.addCadastralUnit.validationErrors);
      }
    },
    [t, createCadastralUnitMutation, handleCloseCreateCadastralUnitDialog, reexecuteQuery, showSnackbar, showError],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        columns={getCadastralUnitsColumns(language, t, { useStatus: !status })}
        empty="cadastral_unit.text.no_cadastral_units"
        initialState={initialState}
        rows={cadastralUnits?.nodes ?? []}
        totalCount={cadastralUnits?.totalCount ?? 0}
        getRowId={({ id }) => String(id)}
        onAdd={canCreate ? handleOpenCreateCadastralUnitDialog : undefined}
        onDelete={canDelete ? handleDelete('cadastral_unit', DeleteCadastralUnitsDocument, reexecuteQuery) : undefined}
        onEdit={
          canUpdate
            ? (row) => {
                navigate(`/app/real-estate/cadastral-units/${row.id}`, { state: { readonly: false } });
              }
            : undefined
        }
        onExport={canRead ? handleExport('id', ExportCadastralUnitsDocument) : undefined}
        onFilter={handleFilter(getCadastralUnitsFilterInput)}
        onPageChange={handlePageChange(cadastralUnits?.pageInfo)}
        onStateChange={setInitialState}
        onSort={handleSort(getCadastralUnitsSortInput)}
        onView={
          canRead
            ? (row) => {
                navigate(`/app/real-estate/cadastral-units/${row.id}`);
              }
            : undefined
        }
      />
      {isCreateCadastralUnitDialogOpen && (
        <CadastralUnitCreateDialog
          onClose={handleCloseCreateCadastralUnitDialog}
          onSave={handleSaveCreateCadastralUnit}
        />
      )}
    </>
  );
};
