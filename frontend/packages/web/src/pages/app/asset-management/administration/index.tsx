import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { AdministrationType } from '@realgimm5/frontend-common/gql/types';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { AdministrationGeneralData } from '../../../../components/domains/Administration/GeneralData/GeneralData';
import { AdministrationTermsTable } from '../../../../components/tables/AdministrationTerms/AdministrationTerms';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteAdministrationDocument,
  ExportAdministrationsDocument,
  GetAdministrationDocument,
  GetAdministrationQuery,
  useGetAdministrationsFullQuery,
  useUpdateAdministrationMutation,
} from '../../../../gql/RealGimm.Web.Administration.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';
import { parseAdministrationFormInputToAdministrationInput } from '../../../../utils/administration/parseAdministrationFormInput';
import { parseAdministrationToAdministrationFormInput } from '../../../../utils/administration/parseAdministrationFragment';
import { getAdministrationItemSchema } from '../../../../utils/administration/schemas/administrations';

export default function Administration() {
  const { canRead, canUpdate, canDelete } = useFeature(RawFeature.PROP_ADMINISTRATION_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/asset-management/administrations');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateAdministrationMutation] = useUpdateAdministrationMutation();
  const [administration, setAdministration] = useState<AdministrationFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const [queryState] = useGetAdministrationsFullQuery({
    variables: {
      where: {
        estateId: {
          eq: administration?.estate?.id,
        },
      },
    },
    pause: readonly || !administration?.estate,
  });

  const existingAdministrations = useMemo(
    () =>
      queryState.data?.administration.listAdministrationsFull.filter(
        (it) => it.id !== administration?.administrationId,
      ) ?? [],
    [administration?.administrationId, queryState.data?.administration.listAdministrationsFull],
  );

  const fetchAdministration = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetAdministrationQuery> = await client.query(GetAdministrationDocument, {
      administrationId: Number(id),
    });
    setLoading(false);
    if (!result.data?.administration.get) return Promise.reject();
    return parseAdministrationToAdministrationFormInput(result.data.administration.get);
  }, [id, client]);

  const {
    getValues,
    formState: { isValid: canSave, errors, isSubmitted, isDirty },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<AdministrationFormInput>({
    defaultValues: fetchAdministration,
    resolver: administration
      ? yupResolver(getAdministrationItemSchema(existingAdministrations, language, t))
      : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setAdministration(formValues as AdministrationFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(administration);
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

  const handleAdministrationChange = useCallback((administration: AdministrationFormInput) => {
    for (const key in administration) {
      setValue(key as keyof AdministrationFormInput, administration[key as keyof AdministrationFormInput]);
    }
    //eslint-disable-next-line
  }, []);

  const handleOnTermsChange = useCallback(
    (count: number) => {
      setValue('hasTerms', count > 0);
    },
    [setValue],
  );

  const onSubmit = useCallback(
    async (administration: AdministrationFormInput) => {
      setLoading(true);
      const result = await updateAdministrationMutation({
        administrationId: Number(administration.administrationId),
        input: parseAdministrationFormInputToAdministrationInput(administration.estate!.id, { ...administration }),
      });
      setLoading(false);
      if (result.data?.administration.update.isSuccess) {
        showSnackbar(t('administration.feedback.update'), 'success');
        setReadonly(true);
        const updatedAdministration = await fetchAdministration();
        setAdministration(updatedAdministration);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.administration.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateAdministrationMutation, showSnackbar, t, fetchAdministration, showError],
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
            !loading
              ? `${t('administration.detail_title', { type: t(`common.enum.administration_type.${administration?.administrationType as AdministrationType}`) })} ${administration?.estate?.internalCode}`
              : ''
          }
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportAdministrationsDocument) : undefined}
              onDelete={canDelete ? handleDelete('administration', DeleteAdministrationDocument, onDelete) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'administration.tab.general_data',
                children: administration && (
                  <AdministrationGeneralData
                    readonly={readonly}
                    onChange={handleAdministrationChange}
                    value={administration}
                    errors={errors}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  administration &&
                  !getAdministrationItemSchema(existingAdministrations, language, t).isValidSync(administration),
              },
              {
                label: 'administration.tab.terms',
                children: administration && (
                  <TableProvider
                    key="administration-terms"
                    initialState={{
                      sorting: [
                        {
                          desc: true,
                          id: 'since',
                        },
                      ],
                    }}
                  >
                    <AdministrationTermsTable onChange={handleOnTermsChange} readonly={!readonly} />
                  </TableProvider>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly && isDirty} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
