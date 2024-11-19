import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { RegistrationPaymentGeneralData } from '../../../../components/domains/RegistrationPayment/GeneralData/GeneralData';
import { RegistrationPaymentRows } from '../../../../components/domains/RegistrationPayment/Rows/Rows';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteRegistrationPaymentDocument,
  ExportRegistrationPaymentsDocument,
  GetRegistrationPaymentDocument,
  GetRegistrationPaymentQuery,
  useUpdateRegistrationPaymentMutation,
} from '../../../../gql/RealGimm.Web.RegistrationPayment.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { parseRegistrationPaymentFormInputToRegistrationPaymentInput } from '../../../../utils/registrationPayment/parseRegistrationPaymentFormInput';
import { parseRegistrationPaymentToRegistrationPaymentFormInput } from '../../../../utils/registrationPayment/parseRegistrationPaymentFragment';
import { getRegistrationPaymentSchema } from '../../../../utils/registrationPayment/schemas/registrationPayment';

export default function RegistrationPayment() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.PROP_REGISTRATION_PAYMENT);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack('/app/asset-management/registration-payments');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateRegistrationPaymentMutation] = useUpdateRegistrationPaymentMutation();
  const [registrationPayment, setRegistrationPayment] = useState<RegistrationPaymentFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchRegistrationPayment = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetRegistrationPaymentQuery> = await client.query(GetRegistrationPaymentDocument, {
      registrationPaymentId: Number(id),
    });
    setLoading(false);
    if (!result.data?.registrationPayment.get) return Promise.reject();
    return parseRegistrationPaymentToRegistrationPaymentFormInput(result.data.registrationPayment.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<RegistrationPaymentFormInput>({
    defaultValues: fetchRegistrationPayment,
    resolver: registrationPayment ? yupResolver(getRegistrationPaymentSchema(language, t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setRegistrationPayment(formValues as RegistrationPaymentFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(registrationPayment);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (registrationPayment: RegistrationPaymentFormInput) => {
      setLoading(true);
      const result = await updateRegistrationPaymentMutation({
        registrationPaymentId: Number(registrationPayment.registrationPaymentId),
        registrationPaymentInput: parseRegistrationPaymentFormInputToRegistrationPaymentInput(registrationPayment),
      });
      setLoading(false);
      if (result.data?.registrationPayment.update.isSuccess) {
        showSnackbar(t('registration_payment.feedback.update'), 'success');
        setReadonly(true);
        const updatedRegistrationPayment = await fetchRegistrationPayment();
        setRegistrationPayment(updatedRegistrationPayment);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.registrationPayment.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateRegistrationPaymentMutation, showSnackbar, t, fetchRegistrationPayment, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={[registrationPayment?.paymentCode, registrationPayment?.contract?.managementSubjectName]
            .filter((it) => !!it)
            .join(' - ')}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete
                  ? handleDelete('registration_payment', DeleteRegistrationPaymentDocument, onDelete)
                  : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportRegistrationPaymentsDocument) : undefined}
            />
          }
        />
        <CardContent>
          {registrationPayment && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <RegistrationPaymentGeneralData
                  control={control}
                  errors={errors}
                  mode={FormMode.Edit}
                  readonly={readonly}
                />
              </Grid2>
              <Grid2 size={12}>
                <RegistrationPaymentRows control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
              </Grid2>
            </Grid2>
          )}
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
