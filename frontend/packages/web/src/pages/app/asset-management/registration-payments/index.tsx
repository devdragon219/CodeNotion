import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { RegistrationPaymentType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RegistrationPaymentCreateDialog } from '../../../../components/wizards/RegistrationPayment/RegistrationPayment';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteRegistrationPaymentsDocument,
  ExportRegistrationPaymentsDocument,
  GetRegistrationPaymentsQueryVariables,
  useCreateRegistrationPaymentMutation,
  useGetRegistrationPaymentsQuery,
} from '../../../../gql/RealGimm.Web.RegistrationPayment.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { getRegistrationPaymentsColumns } from '../../../../utils/registrationPayment/getRegistrationPaymentsColumns';
import { parseRegistrationPaymentFormInputToRegistrationPaymentInput } from '../../../../utils/registrationPayment/parseRegistrationPaymentFormInput';

export default function RegistrationPayments() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.PROP_REGISTRATION_PAYMENT);
  const { t } = useTranslation();
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
  } = useTable<GetRegistrationPaymentsQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      paymentType: {
        eq: RegistrationPaymentType.ManualInput,
      },
    },
  }));
  const [queryState, reexecuteQuery] = useGetRegistrationPaymentsQuery({ pause, variables });
  const [, createRegistrationPaymentMutation] = useCreateRegistrationPaymentMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateRegistrationPaymentDialogOpen, setCreateRegistrationPaymentDialogOpen] = useState(false);

  const registrationPayments = useMemo(
    () => queryState.data?.registrationPayment.listRegistrationPayments,
    [queryState.data],
  );

  const handleOpenCreateRegistrationPaymentDialog = useCallback(() => {
    setCreateRegistrationPaymentDialogOpen(true);
  }, []);

  const handleCloseCreateRegistrationPaymentDialog = useCallback(() => {
    setCreateRegistrationPaymentDialogOpen(false);
  }, []);
  const handleSaveCreateRegistrationPayment = useCallback(
    async (registrationPayment: RegistrationPaymentFormInput) => {
      setLoading(true);
      const result = await createRegistrationPaymentMutation({
        registrationPaymentInput: parseRegistrationPaymentFormInputToRegistrationPaymentInput(registrationPayment),
      });
      setLoading(false);
      if (result.data?.registrationPayment.add.isSuccess) {
        showSnackbar(t('registration_payment.feedback.create'), 'success');
        handleCloseCreateRegistrationPaymentDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.registrationPayment.add.validationErrors);
      }
    },
    [
      createRegistrationPaymentMutation,
      showSnackbar,
      t,
      handleCloseCreateRegistrationPaymentDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('registration_payment.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getRegistrationPaymentsColumns()}
          empty="registration_payment.text.no_registration_payments"
          initialState={initialState}
          rows={registrationPayments?.nodes ?? []}
          totalCount={registrationPayments?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateRegistrationPaymentDialog : undefined}
          onDelete={
            canDelete
              ? handleDelete('registration_payment', DeleteRegistrationPaymentsDocument, reexecuteQuery)
              : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/asset-management/registration-payments/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportRegistrationPaymentsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(registrationPayments?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/asset-management/registration-payments/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateRegistrationPaymentDialogOpen && (
        <RegistrationPaymentCreateDialog
          onClose={handleCloseCreateRegistrationPaymentDialog}
          onSave={handleSaveCreateRegistrationPayment}
        />
      )}
    </Card>
  );
}
