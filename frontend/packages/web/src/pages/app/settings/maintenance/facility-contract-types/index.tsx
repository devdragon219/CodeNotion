import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FacilityContractTypeDialog } from '../../../../../components/dialogs/FacilityContractType/FacilityContractType';
import { RawFeature } from '../../../../../enums/RawFeature';
import { FacilityContractTypeFragment } from '../../../../../gql/RealGimm.Web.FacilityContractType.fragment';
import {
  DeleteFacilityContractTypesDocument,
  ExportFacilityContractTypesDocument,
  GetFacilityContractTypesQueryVariables,
  useAddFacilityContractTypeMutation,
  useGetFacilityContractTypesQuery,
  useUpdateFacilityContractTypeMutation,
} from '../../../../../gql/RealGimm.Web.FacilityContractType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { FacilityContractTypeFormInput } from '../../../../../interfaces/FormInputs/FacilityContractType';
import { getFacilityContractTypesColumns } from '../../../../../utils/facilityContractType/getFacilityContractTypesColumns';
import { getFacilityContractTypesSortInput } from '../../../../../utils/facilityContractType/getFacilityContractTypesSortInput';
import { parseFacilityContractTypeFormInputToFacilityContractTypeInput } from '../../../../../utils/facilityContractType/parseFacilityContractTypeFormInput';
import { parseFacilityContractTypeToFacilityContractTypeFormInput } from '../../../../../utils/facilityContractType/parseFacilityContractTypeFragment';

export default function FacilityContractTypes() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_TYPES);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
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
  } = useTable<GetFacilityContractTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetFacilityContractTypesQuery({ pause, variables });
  const [, createFacilityContractTypeMutation] = useAddFacilityContractTypeMutation();
  const [, updateFacilityContractTypeMutation] = useUpdateFacilityContractTypeMutation();
  const [loading, setLoading] = useState(false);
  const [facilityContractTypeDialogProps, setFacilityContractTypeDialogProps] = useState<{
    input?: FacilityContractTypeFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const facilityContractTypes = useMemo(
    () => queryState.data?.fcltContractType.listFcltContractTypes,
    [queryState.data],
  );

  const handleCloseFacilityContractTypeDialog = useCallback(() => {
    setFacilityContractTypeDialogProps({ open: false });
  }, []);

  const handleEditFacilityContractType = useCallback((row: FacilityContractTypeFragment) => {
    setFacilityContractTypeDialogProps({
      input: parseFacilityContractTypeToFacilityContractTypeFormInput(row),
      open: true,
    });
  }, []);

  const handleViewFacilityContractType = useCallback((row: FacilityContractTypeFragment) => {
    setFacilityContractTypeDialogProps({
      input: parseFacilityContractTypeToFacilityContractTypeFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveFacilityContractType = useCallback(
    async (value: FacilityContractTypeFormInput) => {
      const saveFacilityContractType = async () => {
        if (value.facilityContractTypeId) {
          const result = await updateFacilityContractTypeMutation({
            facilityContractTypeId: value.facilityContractTypeId,
            input: parseFacilityContractTypeFormInputToFacilityContractTypeInput(value),
          });
          return result.data?.fcltContractType.update;
        } else {
          const result = await createFacilityContractTypeMutation({
            input: parseFacilityContractTypeFormInputToFacilityContractTypeInput(value),
          });
          return result.data?.fcltContractType.add;
        }
      };
      setLoading(true);
      const result = await saveFacilityContractType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(`facility_contract_type.feedback.${value.facilityContractTypeId ? 'update' : 'create'}`),
          'success',
        );
        handleCloseFacilityContractTypeDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateFacilityContractTypeMutation,
      createFacilityContractTypeMutation,
      showSnackbar,
      t,
      handleCloseFacilityContractTypeDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddFacilityContractType = useCallback(() => {
    setFacilityContractTypeDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('facility_contract_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getFacilityContractTypesColumns()}
          empty="facility_contract_type.text.no_facility_contract_types"
          initialState={initialState}
          rows={facilityContractTypes?.nodes ?? []}
          totalCount={facilityContractTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddFacilityContractType : undefined}
          onDelete={
            canDelete
              ? handleDelete('facility_contract_type', DeleteFacilityContractTypesDocument, reexecuteQuery)
              : undefined
          }
          onEdit={canUpdate ? handleEditFacilityContractType : undefined}
          onExport={canRead ? handleExport('id', ExportFacilityContractTypesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(facilityContractTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getFacilityContractTypesSortInput)}
          onView={canRead ? handleViewFacilityContractType : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {facilityContractTypeDialogProps.open && (
        <FacilityContractTypeDialog
          input={facilityContractTypeDialogProps.input}
          readonly={facilityContractTypeDialogProps.readonly}
          onClose={handleCloseFacilityContractTypeDialog}
          onSave={handleSaveFacilityContractType}
        />
      )}
    </Card>
  );
}
