import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InterestRateDialog } from '../../../../../components/dialogs/InterestRate/InterestRate';
import { RawFeature } from '../../../../../enums/RawFeature';
import { InterestRateFragment } from '../../../../../gql/RealGimm.Web.InterestRate.fragment';
import {
  DeleteInterestRatesDocument,
  ExportInterestRatesDocument,
  GetInterestRatesQueryVariables,
  useAddInterestRateMutation,
  useGetInterestRatesQuery,
  useUpdateInterestRateMutation,
} from '../../../../../gql/RealGimm.Web.InterestRate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { InterestRateFormInput } from '../../../../../interfaces/FormInputs/InterestRate';
import { getInterestRatesColumns } from '../../../../../utils/interestRate/getInterestRatesColumns';
import { parseInterestRateFormInputToInterestRateInput } from '../../../../../utils/interestRate/parseInterestRateFormInput';
import { parseInterestRateToInterestRateFormInput } from '../../../../../utils/interestRate/parseInterestRateFragment';

export default function InterestRates() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.COMMON_INTERESTRATES);
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
  } = useTable<GetInterestRatesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetInterestRatesQuery({ pause, variables });
  const [, createInterestRateMutation] = useAddInterestRateMutation();
  const [, updateInterestRateMutation] = useUpdateInterestRateMutation();
  const [loading, setLoading] = useState(false);
  const [interestRatesDialogProps, setInterestRatesDialogProps] = useState<{
    input?: InterestRateFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const interestRates = useMemo(() => queryState.data?.interestRate.listInterestRates, [queryState.data]);

  const handleCloseInterestRatesDialog = useCallback(() => {
    setInterestRatesDialogProps({ open: false });
  }, []);

  const handleEditInterestRate = useCallback((row: InterestRateFragment) => {
    setInterestRatesDialogProps({
      input: parseInterestRateToInterestRateFormInput(row),
      open: true,
    });
  }, []);

  const handleViewInterestRate = useCallback((row: InterestRateFragment) => {
    setInterestRatesDialogProps({
      input: parseInterestRateToInterestRateFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveInterestRate = useCallback(
    async (value: InterestRateFormInput) => {
      const saveInterestRate = async () => {
        if (value.interestRateId) {
          const result = await updateInterestRateMutation({
            interestRateId: value.interestRateId,
            input: parseInterestRateFormInputToInterestRateInput(value),
          });
          return result.data?.interestRate.update;
        } else {
          const result = await createInterestRateMutation({
            input: parseInterestRateFormInputToInterestRateInput(value),
          });
          return result.data?.interestRate.add;
        }
      };
      setLoading(true);
      const result = await saveInterestRate();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`interest_rate.feedback.${value.interestRateId ? 'update' : 'create.single'}`), 'success');
        handleCloseInterestRatesDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateInterestRateMutation,
      createInterestRateMutation,
      showSnackbar,
      t,
      handleCloseInterestRatesDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddInterestRate = useCallback(() => {
    setInterestRatesDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('interest_rate.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getInterestRatesColumns()}
          empty="interest_rate.text.no_interest_rates"
          initialState={initialState}
          rows={interestRates?.nodes ?? []}
          totalCount={interestRates?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddInterestRate : undefined}
          onDelete={canDelete ? handleDelete('interest_rate', DeleteInterestRatesDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditInterestRate : undefined}
          onExport={canRead ? handleExport('id', ExportInterestRatesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(interestRates?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={canRead ? handleViewInterestRate : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {interestRatesDialogProps.open && (
        <InterestRateDialog
          input={interestRatesDialogProps.input}
          readonly={interestRatesDialogProps.readonly}
          onClose={handleCloseInterestRatesDialog}
          onSave={handleSaveInterestRate}
        />
      )}
    </Card>
  );
}
