import { AddCircleOutline } from '@mui/icons-material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../enums/RawFeature';
import { EstateSubUnitFragment } from '../../../gql/RealGimm.Web.EstateSubUnit.fragment';
import {
  DeleteEstateSubUnitsDocument,
  GetEstateSubUnitsQueryVariables,
  useCreateEstateSubUnitMutation,
  useGetEstateSubUnitsQuery,
  useUpdateEstateSubUnitMutation,
} from '../../../gql/RealGimm.Web.EstateSubUnit.operation';
import { useFeature } from '../../../hooks/useFeature';
import { EstateSubUnitFormInput } from '../../../interfaces/FormInputs/EstateSubUnit';
import { getEstateSubUnitsColumns } from '../../../utils/estateSubUnit/getEstateSubUnitsColumns';
import { getEstateSubUnitsFilterInput } from '../../../utils/estateSubUnit/getEstateSubUnitsFilterInput';
import { getEstateSubUnitsSortInput } from '../../../utils/estateSubUnit/getEstateSubUnitsSortInput';
import { parseEstateSubUnitFormInputToEstateSubUnitInput } from '../../../utils/estateSubUnit/parseEstateSubUnitFormInput';
import { parseEstateSubUnitToEstateSubUnitFormInput } from '../../../utils/estateSubUnit/parseEstateSubUnitFragment';
import { EstateSubUnitDialog } from './Dialog/Dialog';
import { EstateSubUnitsTableProps } from './EstateSubUnits.types';

export const EstateSubUnitsTable = ({ estateUnit, readonly }: EstateSubUnitsTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_ESTATEUNIT_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstateSubUnitsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        estateUnit: {
          id: {
            eq: estateUnit.estateUnitId,
          },
        },
      },
    }));
  const [queryState, reexecuteQuery] = useGetEstateSubUnitsQuery({ pause, variables });
  const [, createEstateSubUnitMutation] = useCreateEstateSubUnitMutation();
  const [, updateEstateSubUnitMutation] = useUpdateEstateSubUnitMutation();
  const [loading, setLoading] = useState(false);
  const [estateSubUnitDialogProps, setEstateSubUnitDialogProps] = useState<{
    estateSubUnit?: EstateSubUnitFormInput;
    open: boolean;
  }>({
    open: false,
  });
  const estateSubUnits = useMemo(() => queryState.data?.estateSubUnit.listEstateSubUnit, [queryState.data]);
  const hasNoEstateSubUnits = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (estateSubUnits?.totalCount ?? 0) === 0,
    [estateSubUnits, variables],
  );

  const handleEdit = useCallback((estateSubUnit: EstateSubUnitFragment) => {
    setEstateSubUnitDialogProps({
      estateSubUnit: parseEstateSubUnitToEstateSubUnitFormInput(estateSubUnit),
      open: true,
    });
  }, []);

  const handleCreate = useCallback(() => {
    setEstateSubUnitDialogProps({
      open: true,
    });
  }, []);

  const handleCloseEstateSubUnitDialog = useCallback(() => {
    setEstateSubUnitDialogProps({
      open: false,
    });
  }, []);
  const handleSaveEstateSubUnit = useCallback(
    async (estateSubUnit: EstateSubUnitFormInput, mode: FormMode) => {
      const upsertEstateSubUnit = async () => {
        const estateSubUnitInput = parseEstateSubUnitFormInputToEstateSubUnitInput(estateSubUnit);
        switch (mode) {
          case FormMode.Create: {
            const result = await createEstateSubUnitMutation({ estateSubUnitInput });
            return result.data?.estateSubUnit.add;
          }
          case FormMode.Edit: {
            const result = await updateEstateSubUnitMutation({ estateSubUnitInput });
            return result.data?.estateSubUnit.update;
          }
        }
      };
      setLoading(true);
      const result = await upsertEstateSubUnit();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('estate_sub_unit.feedback.create'), 'success');
        handleCloseEstateSubUnitDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      createEstateSubUnitMutation,
      updateEstateSubUnitMutation,
      handleCloseEstateSubUnitDialog,
      reexecuteQuery,
      showSnackbar,
      showError,
      t,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoEstateSubUnits ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="estate_sub_unit.section_title.no_estate_sub_units" />
      ) : (
        <PrimaryTable
          color="secondary"
          columns={getEstateSubUnitsColumns(t)}
          empty="estate_sub_unit.text.no_estate_sub_units"
          initialState={initialState}
          rows={estateSubUnits?.nodes ?? []}
          rowActionsVariant="inline"
          totalCount={estateSubUnits?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate
              ? undefined
              : {
                  color: 'secondary',
                  icon: <AddCircleOutline />,
                  label: 'estate_sub_unit.action.add_estate_sub_unit',
                  onClick: handleCreate,
                }
          }
          onDelete={
            readonly || !canDelete
              ? undefined
              : handleDelete('estate_sub_unit', DeleteEstateSubUnitsDocument, reexecuteQuery)
          }
          onEdit={readonly || !canUpdate ? undefined : handleEdit}
          onFilter={handleFilter(getEstateSubUnitsFilterInput)}
          onPageChange={handlePageChange(estateSubUnits?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getEstateSubUnitsSortInput)}
          onView={canRead ? handleEdit : undefined}
        />
      )}
      {estateSubUnitDialogProps.open && (
        <EstateSubUnitDialog
          estateSubUnit={estateSubUnitDialogProps.estateSubUnit}
          estateUnit={estateUnit}
          readonly={readonly}
          onClose={handleCloseEstateSubUnitDialog}
          onSave={handleSaveEstateSubUnit}
        />
      )}
    </>
  );
};
