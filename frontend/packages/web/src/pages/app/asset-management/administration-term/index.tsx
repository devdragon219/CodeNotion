import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material';
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

import { AdministrationTermGeneralData } from '../../../../components/domains/AdministrationTerm/GeneralData/GeneralData';
import { AdministrationTermInstallments } from '../../../../components/domains/AdministrationTerm/Installments/Installments';
import { AdministrationTermPayments } from '../../../../components/domains/AdministrationTerm/Payments/Payments';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteAdministrationTermDocument,
  GetAdministrationTermDocument,
  GetAdministrationTermQuery,
  useUpdateAdministrationTermMutation,
} from '../../../../gql/RealGimm.Web.AdministrationTerm.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';
import { parseAdministrationTermFormInputToAdministrationTermInput } from '../../../../utils/administrationTerm/parseAdministrationTermFormInput';
import { parseAdministrationTermToAdministrationTermFormInput } from '../../../../utils/administrationTerm/parseAdministrationTermFragment';
import { getAdministrationTermSchema } from '../../../../utils/administrationTerm/schemas/administrationTerm';

export default function AdministrationTerm() {
  const { canUpdate, canDelete } = useFeature(RawFeature.PROP_ADMINISTRATION_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id, termId } = useParams();
  const { handleDelete } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack(`/app/asset-management/administrations/${id}`);
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateAdministrationTermMutation] = useUpdateAdministrationTermMutation();
  const [administrationTerm, setAdministrationTerm] = useState<AdministrationTermFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchAdministrationTerm = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetAdministrationTermQuery> = await client.query(GetAdministrationTermDocument, {
      administrationTermId: Number(termId),
    });
    setLoading(false);
    if (!result.data?.administrationTerm.get) return Promise.reject();
    return parseAdministrationTermToAdministrationTermFormInput(result.data.administrationTerm.get);
  }, [termId, client]);

  const {
    control,
    getValues,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<AdministrationTermFormInput>({
    defaultValues: fetchAdministrationTerm,
    resolver: administrationTerm
      ? // administration and existing administration terms are not needed because we cannot modify dates or type from the detail page
        yupResolver(getAdministrationTermSchema(administrationTerm, [], language, t))
      : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setAdministrationTerm(formValues as AdministrationTermFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(administrationTerm);
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
    async (administrationTerm: AdministrationTermFormInput) => {
      setLoading(true);
      const result = await updateAdministrationTermMutation({
        administrationTermId: Number(administrationTerm.administrationTermId),
        input: parseAdministrationTermFormInputToAdministrationTermInput(administrationTerm),
      });
      setLoading(false);
      if (result.data?.administrationTerm.update.isSuccess) {
        showSnackbar(t('administration_term.feedback.update'), 'success');
        setReadonly(true);
        const updatedAdministrationTerm = await fetchAdministrationTerm();
        setAdministrationTerm(updatedAdministrationTerm);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.administrationTerm.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateAdministrationTermMutation, showSnackbar, t, fetchAdministrationTerm, showError],
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
          title={
            !loading && administrationTerm ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                  {`${t('administration_term.text.estate')} ${administrationTerm.administration.estate?.internalCode ?? ''}`}
                </Typography>
                <Typography variant="h2">
                  {`${administrationTerm.termType ? t(`common.enum.term_type.${administrationTerm.termType}`) : ''}
                  | ${administrationTerm.name}`}
                </Typography>
                <Typography variant="bodySm">
                  {`${administrationTerm.administration.administrationType ? t(`common.enum.administration_type.${administrationTerm.administration.administrationType}`) : ''} | ${administrationTerm.administration.administratorSubject?.name}`}
                </Typography>
              </Box>
            ) : (
              ''
            )
          }
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onEdit={canUpdate ? handleEdit : undefined}
              onDelete={
                canDelete && (!administrationTerm || administrationTerm.installments.length === 0)
                  ? handleDelete('administration_term', DeleteAdministrationTermDocument, onDelete)
                  : undefined
              }
            />
          }
        />
        <CardContent>
          {administrationTerm && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <AdministrationTermGeneralData
                  control={control}
                  errors={errors}
                  mode={FormMode.Edit}
                  setValue={setValue}
                  readonly={readonly}
                />
              </Grid2>
              <Grid2 size={12}>
                <AdministrationTermInstallments
                  control={control}
                  mode={FormMode.Edit}
                  errors={errors}
                  readonly={readonly}
                />
              </Grid2>
              <Grid2 size={12}>
                <AdministrationTermPayments control={control} readonly={readonly} />
              </Grid2>
            </Grid2>
          )}
        </CardContent>
      </Card>

      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
