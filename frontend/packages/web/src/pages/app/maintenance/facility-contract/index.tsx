import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { FacilityContractBilling } from '../../../../components/domains/FacilityContract/Billing/Billing';
import { FacilityContractCatalogueTypes } from '../../../../components/domains/FacilityContract/CatalogueTypes/CatalogueTypes';
import { FacilityContractDocuments } from '../../../../components/domains/FacilityContract/Documents/Documents';
import { FacilityContractEstateUnits } from '../../../../components/domains/FacilityContract/EstateUnits/EstateUnits';
import { FacilityContractGeneralData } from '../../../../components/domains/FacilityContract/GeneralData/GeneralData';
import { FacilityContractPenaltiesField } from '../../../../components/domains/FacilityContract/Penalties/Field/Field';
import { FacilityContractPriceLists } from '../../../../components/domains/FacilityContract/PriceLists/PriceLists';
import { FacilityContractSlasField } from '../../../../components/domains/FacilityContract/SLAs/Field/Field';
import { FacilityContractTermExtensions } from '../../../../components/domains/FacilityContract/TermExtensions/TermExtensions';
import { FacilityContractTicketChecklists } from '../../../../components/domains/FacilityContract/TicketChecklists/TicketChecklists';
import { FacilityContractTickets } from '../../../../components/domains/FacilityContract/Tickets/Tickets';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteFacilityContractDocument,
  ExportFacilityContractsDocument,
  GetFacilityContractDocument,
  GetFacilityContractQuery,
  useUpdateFacilityContractMutation,
} from '../../../../gql/RealGimm.Web.FacilityContract.operation';
import { useFacilityContract } from '../../../../hooks/useFacilityContract';
import { useFeature } from '../../../../hooks/useFeature';
import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { parseFacilityContractFormInputToFacilityContractInput } from '../../../../utils/facilityContract/parseFacilityContractFormInput';
import { parseFacilityContractToFacilityContractFormInput } from '../../../../utils/facilityContract/parseFacilityContractFragment';
import { getFacilityContractBillingSchema } from '../../../../utils/facilityContract/schemas/billing';
import { getFacilityContractCatalogueTypesSchema } from '../../../../utils/facilityContract/schemas/catalogueTypes';
import { getFacilityContractDocumentsSchema } from '../../../../utils/facilityContract/schemas/documents';
import { getFacilityContractEstateUnitsSchema } from '../../../../utils/facilityContract/schemas/estateUnits';
import { getFacilityContractSchema } from '../../../../utils/facilityContract/schemas/facilityContract';
import { getFacilityContractGeneralDataSchema } from '../../../../utils/facilityContract/schemas/generalData';
import { getFacilityContractPenaltiesSchema } from '../../../../utils/facilityContract/schemas/penalties';
import { getFacilityContractPriceListsSchema } from '../../../../utils/facilityContract/schemas/priceLists';
import { getFacilityContractSlasSchema } from '../../../../utils/facilityContract/schemas/slas';
import { getFacilityContractTermExtensionsSchema } from '../../../../utils/facilityContract/schemas/termExtensions';

export default function FacilityContract() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
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
  const goBack = useNavigateBack('/app/maintenance/facility-contracts');
  const { checkCanUseInternalCode } = useFacilityContract();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateFacilityContractMutation] = useUpdateFacilityContractMutation();
  const [facilityContract, setFacilityContract] = useState<FacilityContractFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedFacilityContract = useDebounce(facilityContract);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const fetchFacilityContract = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetFacilityContractQuery> = await client.query(GetFacilityContractDocument, {
      facilityContractId: Number(id),
    });
    setLoading(false);
    if (!result.data?.fcltContract.get) return Promise.reject();
    return parseFacilityContractToFacilityContractFormInput(result.data.fcltContract.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<FacilityContractFormInput>({
    defaultValues: fetchFacilityContract,
    resolver: facilityContract ? yupResolver(getFacilityContractSchema(canUseInternalCode, language, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedFacilityContract) {
      checkCanUseInternalCode(
        debouncedFacilityContract.internalCode,
        debouncedFacilityContract.facilityContractId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedFacilityContract?.internalCode, debouncedFacilityContract?.facilityContractId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setFacilityContract(formValues as FacilityContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(facilityContract);
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
    async (facilityContract: FacilityContractFormInput) => {
      setLoading(true);
      const result = await updateFacilityContractMutation({
        facilityContractId: Number(facilityContract.facilityContractId),
        input: parseFacilityContractFormInputToFacilityContractInput(facilityContract, FormMode.Edit),
      });
      setLoading(false);
      if (result.data?.fcltContract.update.isSuccess) {
        showSnackbar(t('facility_contract.feedback.update'), 'success');
        setReadonly(true);
        const updatedFacilityContract = await fetchFacilityContract();
        setFacilityContract(updatedFacilityContract);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.fcltContract.update.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateFacilityContractMutation, showSnackbar, fetchFacilityContract, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  const handleCalendarChange = useCallback(async () => {
    setFacilityContract(undefined);
    const updatedFacilityContract = await fetchFacilityContract();
    setFacilityContract(updatedFacilityContract);
    reset(updatedFacilityContract);
  }, [fetchFacilityContract, reset]);

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
          title={facilityContract ? `${facilityContract.internalCode} - ${facilityContract.description}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('facility_contract', DeleteFacilityContractDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportFacilityContractsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'facility_contract.tab.general_data',
                children: facilityContract && (
                  <FacilityContractGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractGeneralDataSchema(canUseInternalCode, language, t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.estate_units',
                children: facilityContract && (
                  <FacilityContractEstateUnits
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractEstateUnitsSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.catalogue_types',
                children: facilityContract && (
                  <FacilityContractCatalogueTypes
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractCatalogueTypesSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.slas',
                children: facilityContract && (
                  <FacilityContractSlasField
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    onCalendarChange={handleCalendarChange}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractSlasSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.penalties',
                children: facilityContract && (
                  <FacilityContractPenaltiesField
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    onCalendarChange={handleCalendarChange}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractPenaltiesSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.ticket_checklists',
                children: facilityContract && (
                  <TableProvider key="ticket-checklists">
                    <FacilityContractTicketChecklists control={control} readonly={!readonly} />
                  </TableProvider>
                ),
              },
              {
                label: 'facility_contract.tab.billing',
                children: facilityContract && (
                  <FacilityContractBilling control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractBillingSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.tickets',
                children: facilityContract && (
                  <TableProvider key="tickets">
                    <FacilityContractTickets control={control} />
                  </TableProvider>
                ),
              },
              {
                label: 'facility_contract.tab.price_lists',
                children: facilityContract && (
                  <FacilityContractPriceLists
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractPriceListsSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.term_extensions',
                children: facilityContract && <FacilityContractTermExtensions control={control} readonly={readonly} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractTermExtensionsSchema(t).isValidSync(facilityContract),
              },
              {
                label: 'facility_contract.tab.documents',
                children: facilityContract && (
                  <FacilityContractDocuments
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContract &&
                  !getFacilityContractDocumentsSchema(language, t).isValidSync(facilityContract),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
