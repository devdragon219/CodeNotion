import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { ContractBilling } from '../../../../components/domains/Contract/Billing/Billing';
import { ContractCounterpartsTable } from '../../../../components/domains/Contract/Counterparts/Table/Table';
import { ContractDocuments } from '../../../../components/domains/Contract/Documents/Documents';
import { ContractGeneralData } from '../../../../components/domains/Contract/GeneralData/GeneralData';
import { ContractLocatedUnitsTable } from '../../../../components/domains/Contract/LocatedUnits/Table/Table';
import { ContractOneshotAdditions } from '../../../../components/domains/Contract/OneshotAdditions/OneshotAdditions';
import { ContractRatePlans } from '../../../../components/domains/Contract/RatePlans/RatePlans';
import { ContractRecurringAdditions } from '../../../../components/domains/Contract/RecurringAdditions/RecurringAdditions';
import { ContractRegistrationTaxGeneralData } from '../../../../components/domains/Contract/RegistrationTax/GeneralData/GeneralData';
import { ContractRevaluation } from '../../../../components/domains/Contract/Revaluation/Revaluation';
import { ContractSecurityDeposits } from '../../../../components/domains/Contract/SecurityDeposits/SecurityDeposits';
import { ContractSublocatedData } from '../../../../components/domains/Contract/SublocatedData/SublocatedData';
import { ContractTransactorsTable } from '../../../../components/domains/Contract/Transactors/Table/Table';
import { ContractsTable } from '../../../../components/tables/Contracts/Contracts';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteContractDocument,
  ExportContractsDocument,
  GetContractDocument,
  GetContractQuery,
  useUpdateContractMutation,
} from '../../../../gql/RealGimm.Web.Contract.operation';
import { useContract } from '../../../../hooks/useContract';
import { useFeature } from '../../../../hooks/useFeature';
import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { parseContractFormInputToContractInput } from '../../../../utils/contract/parseContractFormInput';
import { parseContractToContractFormInput } from '../../../../utils/contract/parseContractFragment';
import { getContractBillingSchema } from '../../../../utils/contract/schemas/billing';
import { getContractSchema } from '../../../../utils/contract/schemas/contract';
import { getContractCounterpartsSchema } from '../../../../utils/contract/schemas/counterparts';
import { getContractDocumentsSchema } from '../../../../utils/contract/schemas/documents';
import { getContractGeneralDataSchema } from '../../../../utils/contract/schemas/generalData';
import { getContractLocatedUnitsSchema } from '../../../../utils/contract/schemas/locatedUnits';
import { getContractOneshotAdditionsSchema } from '../../../../utils/contract/schemas/oneshotAdditions';
import { getContractRatePlansSchema } from '../../../../utils/contract/schemas/ratePlans';
import { getContractRecurringAdditionsSchema } from '../../../../utils/contract/schemas/recurringAdditions';
import { getContractRegistrationTaxSchema } from '../../../../utils/contract/schemas/registrationTax';
import { getContractRevaluationSchema } from '../../../../utils/contract/schemas/revaluation';
import { getContractSecurityDepositsSchema } from '../../../../utils/contract/schemas/securityDeposits';
import { getContractSublocatedDataSchema } from '../../../../utils/contract/schemas/sublocatedData';
import { getContractTransactorsSchema } from '../../../../utils/contract/schemas/transactors';
import { Actions } from './Actions/Actions';

export default function Contract() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.PROP_CONTRACT_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id, type } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const isActive = useMemo(() => type === 'active', [type]);
  const goBack = useNavigateBack(`/app/asset-management/contracts/${type}`);
  const { checkCanUseInternalCode } = useContract();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateContractMutation] = useUpdateContractMutation();
  const [contract, setContract] = useState<ContractFormInput>();
  const debouncedContract = useDebounce(contract);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchContract = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetContractQuery> = await client.query(GetContractDocument, {
      contractId: Number(id),
    });
    setLoading(false);
    if (!result.data?.contract.contract) return Promise.reject();
    return parseContractToContractFormInput(result.data.contract.contract);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    getValues,
  } = useForm<ContractFormInput>({
    defaultValues: fetchContract,
    resolver: contract
      ? yupResolver(getContractSchema(canUseInternalCode, isActive, !!contract.sublocatedContract, language, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedContract) {
      checkCanUseInternalCode(debouncedContract.internalCode, debouncedContract.contractId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedContract?.internalCode, debouncedContract?.contractId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setContract(formValues as ContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(contract);
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
    async (contract: ContractFormInput) => {
      setLoading(true);
      const result = await updateContractMutation({
        contractId: Number(contract.contractId),
        contractInput: parseContractFormInputToContractInput(contract),
      });
      setLoading(false);
      if (result.data?.contract.update.isSuccess) {
        showSnackbar(t('contract.feedback.update'), 'success');
        setReadonly(true);
        const updatedContract = await fetchContract();
        setContract(updatedContract);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.contract.update.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateContractMutation, showSnackbar, fetchContract, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const handleSuccess = useCallback(async () => {
    const updatedContract = await fetchContract();
    setContract(updatedContract);
    setSubmitSuccessful(true);
  }, [fetchContract]);

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
          title={contract?.internalCode}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              leftActions={
                readonly &&
                contract &&
                contract.status !== EntryStatus.FrozenClosed && (
                  <Actions contract={contract} isContractActive={isActive} onSuccess={handleSuccess} />
                )
              }
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('contract', DeleteContractDocument, onDelete) : undefined}
              onEdit={canUpdate && contract?.status !== EntryStatus.FrozenClosed ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportContractsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'contract.tab.general_data',
                children: contract && (
                  <ContractGeneralData
                    control={control}
                    errors={errors}
                    isContractActive={isActive}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                    trigger={trigger}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractGeneralDataSchema(canUseInternalCode, language, t).isValidSync(contract),
              },
              ...(isActive && !!contract?.sublocatedContract
                ? ([
                    {
                      label: 'contract.tab.sublocated_data',
                      children: (
                        <ContractSublocatedData
                          control={control}
                          errors={errors}
                          mode={FormMode.Edit}
                          readonly={readonly}
                          setValue={setValue}
                          trigger={trigger}
                        />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getContractSublocatedDataSchema(true, language, t).isValidSync(contract),
                    },
                  ] as Tab[])
                : []),
              {
                label: 'contract.tab.billing',
                children: contract && (
                  <ContractBilling control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly && isSubmitted && contract && !getContractBillingSchema(language, t).isValidSync(contract),
              },
              {
                label: `contract.tab.estate${isActive ? '_sub_' : '_'}units`,
                children: contract && (
                  <ContractLocatedUnitsTable
                    control={control}
                    errors={errors}
                    isContractActive={isActive}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractLocatedUnitsSchema(isActive, true, t).isValidSync(contract),
              },
              {
                label: `contract.tab.counterparts_${isActive ? 'tenant' : 'landlord'}`,
                children: contract && (
                  <ContractCounterpartsTable
                    control={control}
                    errors={errors}
                    isContractActive={isActive}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractCounterpartsSchema(isActive, true, language, t).isValidSync(contract),
              },
              {
                label: `contract.tab.transactors_${isActive ? 'notices' : 'warrants'}`,
                children: contract && (
                  <ContractTransactorsTable
                    control={control}
                    errors={errors}
                    isContractActive={isActive}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractTransactorsSchema(true, language, t).isValidSync(contract),
              },
              {
                label: 'contract.tab.oneshot_additions',
                children: contract && <ContractOneshotAdditions control={control} readonly={readonly} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractOneshotAdditionsSchema(language, t).isValidSync(contract),
              },
              {
                label: 'contract.tab.recurring_additions',
                children: contract && <ContractRecurringAdditions control={control} readonly={readonly} />,
                error:
                  !readonly && isSubmitted && contract && !getContractRecurringAdditionsSchema(t).isValidSync(contract),
              },
              {
                label: 'contract.tab.security_deposits',
                children: contract && (
                  <ContractSecurityDeposits
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
                  contract &&
                  !getContractSecurityDepositsSchema(language, t).isValidSync(contract),
              },
              {
                label: 'contract.tab.registration_tax',
                children: contract && (
                  <ContractRegistrationTaxGeneralData
                    control={control}
                    errors={errors}
                    isContractActive={isActive}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractRegistrationTaxSchema(true, language, t).isValidSync(contract),
              },
              {
                label: 'contract.tab.rate_plans',
                children: contract && <ContractRatePlans control={control} readonly={readonly} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractRatePlansSchema(language, t).isValidSync(contract),
              },
              {
                label: 'contract.tab.revaluation',
                children: contract && (
                  <ContractRevaluation
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
                  contract &&
                  !getContractRevaluationSchema(language, t).isValidSync(contract),
              },
              ...(!isActive
                ? ([
                    {
                      label: 'contract.tab.sub_locations',
                      children: contract && (
                        <TableProvider
                          key="sub-contracts"
                          initialState={{
                            sorting: [
                              {
                                desc: false,
                                id: 'internalCode',
                              },
                            ],
                          }}
                        >
                          <ContractsTable contract={contract} isActive readonly={!readonly} />
                        </TableProvider>
                      ),
                    },
                  ] as Tab[])
                : []),
              {
                label: 'contract.tab.documents',
                children: contract && (
                  <ContractDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contract &&
                  !getContractDocumentsSchema(language, t).isValidSync(contract),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
