import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { MeteringType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { UtilityServiceEstateUnits } from '../../../../components/domains/UtilityService/EstateUnits/EstateUnits';
import { UtilityServiceEstates } from '../../../../components/domains/UtilityService/Estates/Estates';
import { UtilityServiceGeneralData } from '../../../../components/domains/UtilityService/GeneralData/GeneralData';
import { CostChargesTable } from '../../../../components/tables/CostCharges/CostCharges';
import { ReadingsTable } from '../../../../components/tables/Readings/Readings';
import { RawFeature } from '../../../../enums/RawFeature';
import { UtilityServiceFragment } from '../../../../gql/RealGimm.Web.UtilityService.fragment';
import {
  DeleteUtilityServiceDocument,
  ExportUtilityServicesDocument,
  GetUtilityServiceDocument,
  GetUtilityServiceQuery,
  useUpdateUtilityServiceMutation,
} from '../../../../gql/RealGimm.Web.UtilityService.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useUtilityService } from '../../../../hooks/useUtilityService';
import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { parseUtilityServiceFormInputToUtilityServiceInput } from '../../../../utils/utilityService/parseUtilityServiceFormInput';
import { parseUtilityServiceToUtilityServiceFormInput } from '../../../../utils/utilityService/parseUtilityServiceFragment';
import { getUtilityServiceEstateUnitsSchema } from '../../../../utils/utilityService/schemas/estateUnits';
import { getUtilityServiceEstatesSchema } from '../../../../utils/utilityService/schemas/estates';
import { getUtilityServiceGeneralDataSchema } from '../../../../utils/utilityService/schemas/generalData';
import { getUtilityServiceSchema } from '../../../../utils/utilityService/schemas/utilityService';

export default function UtilityService() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.NRGY_SERVICE_BASE);
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
  const goBack = useNavigateBack('/app/energy-management/utility-services');
  const { checkCanUseInternalCode } = useUtilityService();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateUtilityServiceMutation] = useUpdateUtilityServiceMutation();
  const [utilityService, setUtilityService] = useState<UtilityServiceFormInput>();
  const [utilityServiceFragment, setUtilityServiceFragment] = useState<UtilityServiceFragment>();
  const debouncedUtilityService = useDebounce(utilityService);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchUtilityService = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetUtilityServiceQuery> = await client.query(GetUtilityServiceDocument, {
      utilityServiceId: Number(id),
    });
    setLoading(false);
    if (!result.data?.utilityService.get) return Promise.reject();
    setUtilityServiceFragment(result.data.utilityService.get);
    return parseUtilityServiceToUtilityServiceFormInput(result.data.utilityService.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<UtilityServiceFormInput>({
    defaultValues: fetchUtilityService,
    resolver: utilityService ? yupResolver(getUtilityServiceSchema(canUseInternalCode, language, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedUtilityService) {
      checkCanUseInternalCode(
        debouncedUtilityService.internalCode,
        debouncedUtilityService.utilityServiceId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedUtilityService?.internalCode, debouncedUtilityService?.utilityServiceId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setUtilityService(formValues as UtilityServiceFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(utilityService);
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
    async (utilityService: UtilityServiceFormInput) => {
      setLoading(true);
      const result = await updateUtilityServiceMutation({
        utilityServiceId: Number(utilityService.utilityServiceId),
        utilityServiceInput: parseUtilityServiceFormInputToUtilityServiceInput(utilityService),
      });
      setLoading(false);
      if (result.data?.utilityService.update.isSuccess) {
        showSnackbar(t('utility_service.feedback.update'), 'success');
        setReadonly(true);
        const updatedUtilityService = await fetchUtilityService();
        setUtilityService(updatedUtilityService);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.utilityService.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateUtilityServiceMutation, showSnackbar, t, fetchUtilityService, showError],
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
          title={[utilityService?.providerSubject?.internalCode, utilityService?.providerSubject?.name]
            .filter((it) => !!it)
            .join(' - ')}
          titleTypographyProps={{ variant: 'h2' }}
          subheader={[utilityService?.utilityType?.internalCode, utilityService?.utilityType?.description]
            .filter((it) => !!it)
            .join(' - ')}
          subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.blue[500] }), variant: 'bodyMd' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('utility_service', DeleteUtilityServiceDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportUtilityServicesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'utility_service.tab.general_data',
                children: utilityService && (
                  <UtilityServiceGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  utilityService &&
                  !getUtilityServiceGeneralDataSchema(canUseInternalCode, language, t).isValidSync(utilityService),
              },
              {
                label: 'utility_service.tab.estates',
                children: utilityService && (
                  <UtilityServiceEstates control={control} errors={errors} readonly={readonly} setValue={setValue} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  utilityService &&
                  !getUtilityServiceEstatesSchema(t).isValidSync(utilityService),
              },
              {
                label: 'utility_service.tab.estate_units',
                children: utilityService && (
                  <UtilityServiceEstateUnits
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  utilityService &&
                  !getUtilityServiceEstateUnitsSchema(t).isValidSync(utilityService),
              },
              {
                label: utilityService
                  ? `utility_service.tab.${MeteringType.IncrementalReading === utilityService.utilityType?.meteringType ? 'readings' : 'usages'}`
                  : 'utility_service.tab.readings_usages',
                children: utilityService && (
                  <TableProvider
                    key="readings"
                    initialState={{
                      sorting: [
                        {
                          desc: true,
                          id: 'readingTimestamp',
                        },
                      ],
                    }}
                  >
                    <ReadingsTable readonly={!readonly} utilityService={utilityService} />
                  </TableProvider>
                ),
              },
              {
                label: 'utility_service.tab.cost_charges',
                children: utilityService && (
                  <TableProvider
                    key="cost-charges"
                    initialState={{
                      sorting: [
                        {
                          desc: true,
                          id: 'referenceDate',
                        },
                      ],
                    }}
                  >
                    <CostChargesTable utilityService={utilityServiceFragment} readonly={!readonly} />
                  </TableProvider>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
